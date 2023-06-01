import React, { createContext, useState } from "react";

export const VerifcationCodeContext = createContext()

export const VerifcationCodeProvider = ({ children }) => {
    const recipientPhone = `+63${localStorage.getItem("phone")}`
    const [code, setCode] = useState(null)

    const generateCode = (e) => {
        const codeGenerated = Math.floor(Math.random() * 999999)
        setCode(codeGenerated)

        // Call the Send Message API to send an SMS confirmation to the recipient's phone number
        const apiKey = '00cefdfff63ae19d0d9ae05987e705e91eecfbf8';
        const message = `${codeGenerated} your Smile Care Dental Clinic verifiction code.`;
        const device = 427; // ID of the device used for sending
        const sim = 1; // Sim slot number for sending message
        const priority = 1; // Send the message as priority
        const url = `https://sms.teamssprogram.com/api/send?key=${apiKey}&phone=${recipientPhone}&message=${message}&device=${device}&sim=${sim}&priority=${priority}`;

        fetch(url)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    return (
        <VerifcationCodeContext.Provider value={{ code, setCode, generateCode }}>
            {children}
        </VerifcationCodeContext.Provider>
    )
}