import React from 'react';
import { Toaster } from 'react-hot-toast';

const NewNoteLayout = ({children}) => {
    return (
        <div>
            <Toaster></Toaster>
            {children}
        </div>
    );
};

export default NewNoteLayout;