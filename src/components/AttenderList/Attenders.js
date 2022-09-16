import {Button, message, Popconfirm, Table} from "antd";
import {useEffect, useState} from "react";
import api from "../../services/network"
import RegisterForm from "../RegisterForm/AttenderForm";

export default function Attenders() {

    const [data, setData] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [attender, setAttender] = useState({});

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            api.get("/attenders", {})
                .then(response => {
                    if (response.status.code === 'success') {
                        setData([...response.data.attenders])
                    }
                })
                .catch(err => {
                    message.error(err.toString(), 3).then()
                })
                .finally(() => setLoading(false))
        }
        fetchData()
    }, [])

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (v) => <img src={v || '../assets/no-avatar.png'} alt="avatar" style={{maxHeight: 50, width: 50}}/>
        },
        {
            title: 'Fullname',
            dataIndex: 'full_name',
            key: 'full_name'
        },
        {
            title: 'Date of birth',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            render: (d) => new Date(d).toLocaleDateString()
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Organization',
            dataIndex: 'organization',
            key: 'organization'
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: 'Experience (month)',
            dataIndex: 'months_of_experience',
            key: 'months_of_experience'
        },
        {
            title: 'Join experience',
            dataIndex: 'is_join_experience_section',
            key: 'is_join_experience_section',
            render: (v) => v ? 'Yes' : 'No'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, item) => <div>
                <Button type={'primary'} onClick={() => editAttender(item)}>Edit</Button>

                <Popconfirm
                    title="Are you sure to delete this attender?"
                    onConfirm={() => deleteAttender(item)}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type={'text'} danger>Delete</Button>
                </Popconfirm>

            </div>
        },
    ];
    const editAttender = (item) => {
        setAttender(item);
        setShowDetail(true);
    }
    const deleteAttender = (item) => {
        api.delete('/attenders/' + item.id)
            .then(response => {
                if (response.status.code === 'success') {
                    const index = data.findIndex(a => a.id === item.id);
                    if (index !== -1) {
                        data.splice(index, 1);
                        setData([...data]);
                    }
                    message.success('Successfully deleted', 3).then()
                } else {
                    message.error('Error occurred!', 3).then()
                }
            })
            .catch(err => {
                message.error(err.toString(), 3).then()
            })
    }
    return (
        <div style={{padding: 50}}>
            <Table dataSource={data} columns={columns} rowKey={item => item.id} loading={loading}/>

            <RegisterForm
                item={attender}
                show={showDetail}
                onOk={item => {
                    setShowDetail(false)
                    const index = data.findIndex(i => i.id === attender.id);
                    if (index !== -1) {
                        data[index] = JSON.parse(JSON.stringify(item));
                        data[index].id = attender.id;
                        setData([...data])
                    }
                }}
                onCancel={() => {
                    setShowDetail(false)
                }}/>
        </div>
    )
}