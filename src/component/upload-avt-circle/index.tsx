import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { DefaultImg } from '../../asset/image/defaultImg';
import './index.scss';

export type UploadAvtCircle = {
    onChange?: ((info: UploadChangeParam<UploadFile<any>>) => void) | undefined;
    customRequest?: any;
    previewImage?: string;
};
export const UploadAvtCircle = ({
    onChange,
    customRequest = () => {},
    previewImage,
}: UploadAvtCircle) => {
    return (
        <Upload
            className="upload-avt"
            showUploadList={false}
            onChange={onChange}
            customRequest={customRequest}
        >
            {previewImage != null ? (
                <div className="flex relative mask-img-container h-[150px] w-[150px] overflow-hidden rounded-full">
                    <div className="flex mask-image-custom absolute rounded-full bg-black/[0.5] z-10 h-full w-full items-center justify-center ">
                        <UploadOutlined className="mask-image-custom-icon text-white text-3xl" />
                    </div>
                    <Image
                        src={previewImage}
                        alt=""
                        className="avt-img rounded-full object-cover "
                        fallback={DefaultImg}
                        preview={false}
                    />
                </div>
            ) : (
                <div className="upload-container">
                    <PlusOutlined className="upload-icon" />
                    <div className="upload-text">Avatar</div>
                </div>
            )}
        </Upload>
    );
};
