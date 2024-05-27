import React from 'react';
import { FilmItem } from '../../../film-item';

const SearchItem = ({ title}: FilmItem) => {
    return (
       
            <div className="name-title py-[6px]">{title}</div>
      
    );
};

export default SearchItem;
