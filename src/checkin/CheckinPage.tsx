import React from "react";
import { UserHelper } from "../helpers";
import { Household } from "./components/Household";
import { Services } from "./components/Services";


export const CheckinPage = () => {

    const [currentStep, setCurrentStep] = React.useState<string>("");

    const handleServiceSelected = () => {
        setCurrentStep("household");
    }

    const getContent = () => {
        var result = <h1 style={{ textAlign: "center" }}>Please login</h1>
        if (UserHelper.user?.displayName) {
            switch (currentStep) {
                case "household":
                    result = <Household />

                    break;
                default:
                    result = <Services selectedHandler={handleServiceSelected} />;
                    break;
            }
        }
        return result;
    }


    return (
        <div style={{ height: "100vh" }}>
            <div style={{ backgroundColor: "#FFF", textAlign: "center" }}>
                <img src="https://app.chums.org/images/logo-login.png" />
            </div>
            <div style={{ maxWidth: 600, marginLeft: "auto", marginRight: "auto", paddingTop: 20 }}>
                {getContent()}
            </div>

        </div>);
}