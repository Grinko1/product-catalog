import { Space, Spin } from 'antd';
import style from './Loader.module.scss';
import { memo } from 'react';

const Loader = () => {
  return (
    <Space direction='vertical' style={{ width: '100%', marginTop: 150 }}>
      <Spin tip='Loading' size='large'>
        <div className='content' />
      </Spin>
    </Space>
  );
};

export default memo(Loader);
