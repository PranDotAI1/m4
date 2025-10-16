import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import AbhaAbout from "../views/Abha-home/UserFlow"
import Login from "../views/Home/Login"
import LoginNHPRPage from "../views/NHPR-login/NHPR-Login"
import HealthcareProfessionals from "../views/HPR/HealthcareProfessionals"
import HFR from "../views/HFR/HFR"



const WebRoutes = () => {
    return (
        <>
            <Suspense>
                <Routes>
                    <Route path="/abha-home" element={<AbhaAbout />}></Route>
                    <Route path="/HealthcareProfessionals" element={<HealthcareProfessionals />}></Route>
                    <Route path="/HFR" element={<HFR />}></Route>
                    <Route path="/login-NHPR" element={<LoginNHPRPage />}></Route>
                    <Route path="/" element={<Login />}></Route>
                </Routes>
            </Suspense>
        </>
    )
}

export default WebRoutes;