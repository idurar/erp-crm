import { useProfileContext } from '@/context/profileContext';
import { generate as uniqueId } from 'shortid';
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileAdminForm from './ProfileAdminForm';

import { updateProfile } from '@/redux/auth/actions';

import { selectCurrentAdmin } from '@/redux/auth/selectors';

import useLanguage from '@/locale/useLanguage';

const UpdateAdmin = ({ config }) => {
  const translate = useLanguage();

  const { profileContextAction } = useProfileContext();
  const { updatePanel } = profileContextAction;
  const dispatch = useDispatch();
  const { ENTITY_NAME } = config;

  const currentAdmin = useSelector(selectCurrentAdmin);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(currentAdmin);
  }, [currentAdmin]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        updatePanel.close();
      })
      .catch((errorInfo) => {
        console.log('Form validation failed:', errorInfo);
      });
  };

  const onSubmit = (fieldsValue) => {
    if (fieldsValue.file) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }

    dispatch(updateProfile({ entity: 'admin/profile', jsonData: fieldsValue }));
  };

  return (
    <div>
      <PageHeader
        onBack={() => updatePanel.close()}
        title={ENTITY_NAME}
        ghost={false}
        extra={[
          <Button
            onClick={() => updatePanel.close()}
            key={`${uniqueId()}`}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              handleSubmit();
            }}
            type="primary"
            icon={<SaveOutlined />}
            htmlType="submit"
          >
            {translate('Save')}
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Row align="start">
        <Col xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 4 }}></Col>
        <Col xs={{ span: 16 }}>
          <Form
            form={form}
            onFinish={onSubmit}
            labelAlign="left"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 10 }}
          >
            <ProfileAdminForm isUpdateForm={true} />
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateAdmin;
