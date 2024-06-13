import { AppstoreOutlined, BarsOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { EpisodeFilm } from '../../model/film';
import { EspKanban } from './esp-kanban';
import { EspList } from './esp-list';
import './index.scss';

export type ListEpisodesType = {
    title?: string;
    titleFilm?: string;
    subInfo?: Array<string>;
    sessions?: MenuProps['items'];
    multiSessions?: boolean;
    listEpisodes: Array<EpisodeFilm>;
    watchingData?: any
};
export const ListEpisodes = ({
    title,
    titleFilm,
    subInfo,
    sessions = [],
    listEpisodes,
    multiSessions,
    watchingData
}: ListEpisodesType) => {
    const [isListVisible, setIsListVisible] = useState(true);

    const toggleView = () => {
        setIsListVisible(!isListVisible);
    };

    return (
        <div className="list-container-watching">
            <div className="list-heading">
                <Title level={3} className="list-title">
                    {title}
                </Title>
                <div className="list-sub-info">
                    {subInfo?.map((item) => (
                        <p className="list-sub-info-item">{item}</p>
                    ))}
                </div>
            </div>
            <div className="session-view">
                <div className={`session-section ${multiSessions === true ? 'show' : ''}`}>
                    {/* <div className={`session-section show`}> */}
                    <Dropdown
                        menu={{ items: sessions }}
                        trigger={['click']}
                        className="session-section-select"
                    >
                        <Button className="session-btn-select">
                            Mùa 1
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                <div className="session-segment">
                    <div className="segment-icon">
                        {isListVisible ? (
                            <AppstoreOutlined onClick={toggleView} />
                        ) : (
                            <BarsOutlined onClick={toggleView} />
                        )}
                    </div>
                    <div className="segment-content">
                        {isListVisible ? (
                            <EspList listEpisodes={listEpisodes} watchingData={watchingData}/>
                        ) : (
                            <EspKanban listEpisodes={listEpisodes} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
