import React from "react";
import { UserHelper } from "../helpers";
import { DirectorySearch } from "./components/DirectorySearch";


export const DirectoryPage = () => {

    const [currentStep, setCurrentStep] = React.useState<string>("");

    const handlePersonSelected = (personId: string) => {
        setCurrentStep("person");
    }

    const getContent = () => {
        var result = <h1 style={{ textAlign: "center" }}>Please login</h1>
        if (UserHelper.user?.displayName) {
            switch (currentStep) {
                default:
                    result = <DirectorySearch selectedHandler={handlePersonSelected} />
                    break;
            }
        }
        return result;
    }

    return (
        <div style={{ height: "100vh", backgroundColor: "#F9F9F9", padding: 20 }}>
            {getContent()}
        </div>);
}