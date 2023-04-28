import React, { use, useState } from 'react';
import AddressClients from '../components/stepformcomponents/addressclients';
import EndearingTerm from '../components/stepformcomponents/endearingterm';
import MessageInput from '../components/stepformcomponents/messageinput';
import WelcomeInput from '../components/stepformcomponents/welcomeinput';
import WithoutName from '../components/stepformcomponents/withoutname';

export default function StepForm() {
    const [page, setPage] = useState(0);
    const formList = ["welcomeInput", "addressClients", "endearingTerm", "withoutName", "messageInput"];
    const formLength = formList.length;
    
    const [values, setValues] = useState({
        welcomeInput:"",
        addressClients:"",
        endearingTerm:"",
        withoutName:"",
        messageInput:""
    });
    
    

    const handlePrev = () => {
        setPage(page == 0 ? 0 : page - 1);
    };

    const handleNext = () => {
        setPage((page) => (page === formLength - 1 ? 0 : page + 1));
      };
      
    

    const handleForm = () => {
        switch (page) {
            case 0:
                return <WelcomeInput handleBack={handlePrev} handleNext={handleNext} formValues={values}
                onChange={onChange} />;
            case 1:
                return <AddressClients handleBack={handlePrev} handleNext={handleNext} formValues={values}
                onChange={onChange} />;
            case 2:
                return <EndearingTerm handleBack={handlePrev} handleNext={handleNext} formValues={values}
                onChange={onChange} />;
            case 3:
                return <WithoutName handleBack={handlePrev} handleNext={handleNext} formValues={values}
                onChange={onChange} />;
            case 4:
                return <MessageInput handleBack={handlePrev} handleNext={handleNext} formValues={values}
                onChange={onChange} handleSubmit={handleSubmit}/>;
            default:
                return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/userpreferences', {
            method: 'POST',
            body: JSON.stringify(
             values
            ),

          });
       
          return response
        
      };
    
      const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues((prevValues) => ({
          ...prevValues,
          [name]: type === "checkbox" ? checked : value,
        }));
      };

    return (
        <div>
            <h1 className="mt-10 text-4xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
                Welcome to Really Handwritten.{' '}
            </h1>
            <div className=' relative'>
                {handleForm()}
            </div>
        </div>
    );
}
