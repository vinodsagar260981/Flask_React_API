import { Text, 
        Button, 
        useDisclosure, 
        FormControl, 
        FormLabel, 
        Input, 
        Flex,
        Modal,
        ModalOverlay,
        ModalContent,
        ModalHeader,
        ModalBody,
        ModalCloseButton, 
        Textarea,
        RadioGroup,
        Radio,
        ModalFooter,
        useToast} from '@chakra-ui/react'
        
import { BiAddToQueue } from "react-icons/bi";
import { useEffect, useState } from 'react'
import { BASE_URL } from '../App';

function UserModel({ setUsers }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
      name: "",
      role: "",
      description: "",
      gender: "",
    })

    const toast = useToast()

    const handleCreateUser = async (e) => {
      e.preventDefault() // prevent page refresh
      setIsLoading(true)
      try{
        const res = await fetch(BASE_URL + "/friends",{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        })

        const data = await res.json()
        if(!res.ok){
          throw new Error(data.error)
        }

        toast({
          status: "success",
          title: "Yayy! 🎉",
          description: "Friend created successfully.",
          duration: 2000,
          // position: "top-center",
          isClosable: true,
        })
        onClose()
        setUsers((prevUsers) => [...prevUsers, data])// display once user add friends
        
        setInputs({
          name: "",
          role: "",
          description: "",
          gender: "",
        })//clear inputs

      }catch(error){
        toast({
          status: "error",
          title: "An error occurred.",
          description: error.message,
          duration: 4000,
        })
      } finally{
        setIsLoading(false)
      }
    }

  return (
    <>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20}/>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <form onSubmit={(handleCreateUser)}>
        <ModalContent>
            <ModalHeader>New Friend 😍</ModalHeader>
            <ModalCloseButton/>

                
            <ModalBody pd={6}>
                <Flex alignItems={"center"} gap={4}>
                    {/* Left */}
                    <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Input placeholder="Virat"
                          value={inputs.name}
                          onChange={(e) => setInputs({...inputs, name: e.target.value})}
                        />
                    </FormControl>
                    {/* Right */}
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Input placeholder="Criket Player"
                          value={inputs.role}
                          onChange={(e) => setInputs({...inputs, role: e.target.value})}
                        />
                    </FormControl>
                </Flex>
                <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                      resize={"none"}
                      overflowY={"hidden"}
                      placeholder="Best Batsmen in Indian team"
                      value={inputs.description}
                      onChange={(e) => setInputs({...inputs, description: e.target.value})}
						/>
                </FormControl>

                <RadioGroup mt={4}>
								<Flex gap={5}>
									<Radio
										value='male'
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									>
										Male
									</Radio>
									<Radio
										value='female'
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									>
										Female
									</Radio>
								</Flex>
				</RadioGroup>

            </ModalBody>

            <ModalFooter>
            <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
								Add
							</Button>
							<Button onClick={onClose}>Cancel</Button>
            </ModalFooter>

        </ModalContent>
        </form>


      </Modal>  

    </>
  )
}

export default UserModel
