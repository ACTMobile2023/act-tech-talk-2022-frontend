import React, {useEffect, useState} from "react";
import {PlusOutlined} from '@ant-design/icons';
import './AttenderForm.css'
import {Checkbox, DatePicker, Divider, Form, Input, InputNumber, Modal, Select, Upload, message, Button} from "antd";
import {getBase64} from "../../services/helpers";
import {useDispatch} from "react-redux";
import {attenderAction} from "../../redux/actions";
import api from "../../services/network"
import moment from 'moment';

export default function AttenderForm(props) {
    const {show, onCancel, onOk, item} = props
    const [avatar, setAvatar] = useState('')
    const [isNew, setIsNew] = useState(true)
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (item?.id && show && isNew) {
            form.setFieldsValue({
                full_name: item.full_name,
                date_of_birth: moment(item.date_of_birth),
                avatar: item.avatar,
                email: item.email,
                organization: item.organization,
                role: item.role,
                months_of_experience: item.months_of_experience,
                is_join_experience_section: item.is_join_experience_section
            })
            setIsNew(false)
            setAvatar(item.avatar)
        }
        // eslint-disable-next-line
    }, [show])

    const onFormSubmit = () => {
        const processResponse = (response, data) => {
            if (response?.status?.code === 'success') {
                message.success('Successfully!', 3).then()
                if (onOk) {
                    onOk(data)
                    form.resetFields();
                }
                dispatch(attenderAction.newAttender(data))
            } else {
                message.error('Error occurred', 3).then()
            }
        }
        form.validateFields().then(values => {
            if (values) {
                const data = JSON.parse(JSON.stringify(values))
                data.avatar = avatar;
                data.date_of_birth = new Date(data.date_of_birth);

                if (!isNew) {
                    api.put("/attenders/" + item.id, {body: data})
                        .then(response => {
                            processResponse(response, data)
                        })
                        .catch(err => {
                            message.error(err.toString(), 3).then()
                        })
                        .finally(() =>
                            setIsNew(true)
                        );
                } else {
                    api.post("/attenders", {body: data})
                        .then(response => {
                            processResponse(response, data)
                        })
                        .catch(err => {
                            message.error(err.toString(), 3).then()
                        })
                        .finally(() =>
                            setIsNew(true)
                        );
                }
            }
        }).catch(() => {
            message.error('Input all required fields', 3).then()
        })
    }

    return (
        <Modal title={'Submit your information'}
               open={show}
               footer={[
                   <div key={'footer_div_01'}>
                       <Button onClick={() => {
                           setIsNew(true)
                           onCancel()
                       }}>
                           Cancel
                       </Button>
                       <Button onClick={onFormSubmit}
                               form="form"
                               key="submit"
                               htmlType="submit"
                               type={'primary'}>
                           Ok
                       </Button>
                   </div>
               ]}
               closable={false}
               forceRender={true}
               destroyOnClose={true}
               style={{top: 20}}
               width={600}
        >
            <Form id="form"
                  form={form}
                  labelCol={{span: 7}}
                  wrapperCol={{span: 17}}
                  autoComplete="off">
                <Upload
                    className="avatar-uploader"
                    listType={'picture-card'}
                    showUploadList={false}
                    beforeUpload={event => {
                        getBase64(event).then(base64 => {
                            setAvatar(base64)
                        });
                    }}
                >
                    {avatar ?
                        <img src={avatar} alt="avatar"
                             style={{maxHeight: 120, width: '100%'}}/> :
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload avatar</div>
                        </div>
                    }
                </Upload>

                <Divider/>
                <Form.Item
                    label={"Fullname:"}
                    name="full_name"
                    rules={[
                        {required: true, message: "Fullname is required"}
                    ]}
                >
                    <Input placeholder="Input fullname"/>
                </Form.Item>
                <Form.Item
                    label={"Date of birth:"}
                    name="date_of_birth"
                    rules={[
                        {required: true, message: "Date of birth is required"}
                    ]}
                >
                    <DatePicker disabledDate={d => d.isAfter(new Date())}
                                format={'DD/MM/YYYY'} placeholder="Input date of birth"/>
                </Form.Item>
                <Form.Item
                    label="Email:"
                    name="email"
                    rules={[
                        {required: true, message: "Email is required"},
                        {pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', message: "Wrong email format"},
                    ]}>
                    <Input placeholder="Input email"/>
                </Form.Item>
                <Form.Item
                    label="Company/University:"
                    name="organization"
                >
                    <Input placeholder="Input company or university"/>
                </Form.Item>
                <Form.Item
                    label="Experienced position:"
                    name="role"
                >
                    <Select placeholder="Experienced position">
                        <Select.Option value={'Dev'}>Dev</Select.Option>
                        <Select.Option value={'QA'}>Automation QA</Select.Option>
                        <Select.Option value={'Student'}>Student</Select.Option>
                        <Select.Option value={'Other'}>Other</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Experience (in month):"
                    name="months_of_experience"
                >
                    <InputNumber placeholder="Months"/>
                </Form.Item>
                <Form.Item
                    name="is_join_experience_section"
                    valuePropName="checked"
                    wrapperCol={{offset: 7, span: 17}}
                >
                    <Checkbox>
                        Confirm to join experience section
                    </Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
}