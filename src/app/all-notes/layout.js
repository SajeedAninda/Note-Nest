import React from 'react';
import { Toaster } from 'react-hot-toast';

const AllNoteLayout = ({children}) => {
    return (
        <div>
            <Toaster></Toaster>
            {children}
        </div>
    );
};

export default AllNoteLayout;