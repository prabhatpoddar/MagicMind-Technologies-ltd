import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import styles from "./styles.module.css"
import { useDispatch } from 'react-redux'
import { RxCrossCircled } from 'react-icons/rx'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { message } from 'antd'
import { MdDelete } from 'react-icons/md'
import { fetchTaskData, updateTaskData } from '../Redux/TasksReducer'

const Delete = ({ id }) => {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const deleteTask = (id, data) => {
        dispatch(updateTaskData(id, data)).then((res) => {

            dispatch(fetchTaskData()).then((res2) => {
                message.success("Delete Successfully")
            }).catch((err) => {
                message.error("Something went wrong")
            })

        }).catch((err) => {
            message.error("Something went wrong")
        })
    }

    return (
        <>
            <MdDelete color='#FF8080' onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                    </ModalBody>
                    <div className={styles.deleteModeldiv}>
                        <RiDeleteBin6Fill fontSize={80} color='#DB3B53' />
                        <p>Are your sure want to delete this<br />
                            task?</p>
                    </div>

                    <ModalFooter>
                        <div className={styles.modelFooter}>
                            <Button variant='solid' color="black" mr={3}
                                onClick={() => deleteTask(id, { deleted: true })}
                            >
                                Yes
                            </Button>
                            <Button variant='outline' color="black" onClick={onClose}>No</Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}

export default Delete