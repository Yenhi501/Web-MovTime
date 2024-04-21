import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import './index.scss';
import { FilmItem } from '../../film-item';
import { useNavigate } from 'react-router-dom';
import { ChildrenCategoriesHeader } from '../handle-data-header';

interface DropdownMenuProps {
    title: string;
    data: ChildrenCategoriesHeader[];
    queryParam?: string;
}

export const DropdownList: React.FC<DropdownMenuProps> = ({ title, data, queryParam }) => {
    const columns = 3;
    const itemsPerColumn = Math.ceil(data.length / columns);
    const navigate = useNavigate();

    const handleItemClick = (title: string, value: number, idItem: string) => {
        navigate({
            pathname: '/search',
            search: `${queryParam}=${encodeURIComponent(idItem)}`,
        });
    };

    const renderMenuItems = (start: number, end: number): React.ReactNode => {
        return data.slice(start, end).map((item, index) => (
            <Menu.Item
                key={`item-${start + index}`}
                onClick={() => handleItemClick(title, start + index, item.id.toString())}
                className="w-max"
            >
                {item && <React.Fragment>{item.value}</React.Fragment>}
            </Menu.Item>
        ));
    };

    const menu = (
        <Menu mode="horizontal" style={{ display: 'flex' }} >
            {Array.from({ length: columns }).map((_, columnIndex) => (
                <Menu.ItemGroup
                    key={`column-${columnIndex}`}
                    style={{ flex: 1, textAlign: 'start' }}
                >
                    {renderMenuItems(
                        columnIndex * itemsPerColumn,
                        (columnIndex + 1) * itemsPerColumn,
                    )}
                </Menu.ItemGroup>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} overlayStyle={{ zIndex: 9999 }} className="flex max-lg:hidden " >
            <div className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <div className="dropdownlist">{title}</div>
            </div>
        </Dropdown>
    );
};
