import React from 'react';
import DefaultLayout from 'hoc/Layout/DefaultLayout';
import "./css/FloatingNavbarShowcase.css";

const FloatingNavbarShowcase = () => {
    return (
        <DefaultLayout title="Floating Navbar Showcase" content="Floating Navbar Showcase">
            <div className='base-header'>
                <div className='floating-header'>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default FloatingNavbarShowcase;