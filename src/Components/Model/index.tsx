import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

type ModalProps = {
  title: string;
  handleLogin: () => void;
};

const ModalComponent: React.FC<ModalProps> = ({ title, handleLogin }: ModalProps) => {
  return (
    <>
      <div className='Login-Page-Class'>
        <h1>Welcome to Collabed</h1>
        <Button size="large" type="dashed" icon={<GoogleOutlined />} onClick={handleLogin}>
          Sign In with Google
        </Button>
      </div>
    </>
  );
};

export default ModalComponent;
