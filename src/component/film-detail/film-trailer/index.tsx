import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import React from 'react';
import ReactPlayer from 'react-player';
import { t } from '../../../utils/i18n';

const { Panel } = Collapse;

const FilmDetailTrailer: React.FC<{ filmDetail: any }> = ({ filmDetail }) => {
    return (
        <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            ghost
            className="ml-[-10px] !mt-[-6px]"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
            <Panel header={<span style={{ fontSize: '16px' }}>{t('Trailer')} </span>} key="1">
                <div className="overall-info">
                    <ReactPlayer
                        url={filmDetail.trailerURL}
                        controls
                        playing={true}
                        width="75%"
                        height="100%"
                        style={{ borderRadius: '4px' }}
                    />
                </div>
            </Panel>
        </Collapse>
    );
};

export default FilmDetailTrailer;
