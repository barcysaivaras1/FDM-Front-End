import "../css/ReportPage.css"
import { useState, useEffect } from 'react'
import NavBar from "./NavBar";
import httpClient from '../httpClient';

const ls_key = "fdm-expenses-client/make-a-report/form-data";

export function ReportPage(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const data = localStorage.getItem(ls_key);
        console.log(`localstorage data: `, {data});

        await httpClient.post("/api/bugs", {
                title: title,
                description: description
            },
        )
        .then(function (response) {
            console.log("Response:  ", response);
        })
        .catch(function (error) {
            console.error("Failed to make bug report. Status: " + error.response.status);
            alert("Something went wrong.");
        })
    }

    useEffect(()=>{
        const data = localStorage.getItem(ls_key);
        if (data) {
            const parsed = JSON.parse(data);
            setTitle(parsed.title);
            setDescription(parsed.description);
            localStorage.removeItem(ls_key);
        }
    }, []);

    useEffect(()=>{
        const handleBeforeUnload = (event)=>{
            if (title || description) { // if there is a title or a description then save
                event.returnValue = false;
                const data_to_save = {title, description};
                console.log(data_to_save);
                localStorage.setItem(ls_key, JSON.stringify(data_to_save));
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return ()=>{
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [title, description]);

    useEffect(() => {
      document.title = 'Bug Report';
    }, [])

    return(
        <div>
            <NavBar />
            <div className="reportContainer">
                <legend className='reportLegend'>Report</legend>
                <form className='reportForm' onSubmit={handleSubmit}>
                    <input type="text" 
                        placeholder='Give Your Bug Report a Title' 
                        className='reportTitleField' required
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                    <textarea 
                        placeholder='Write a Description of the Problem' 
                        className='reportDescriptionField' required
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />

                    <button className='reportClearAll' onClick={() => {setTitle(""); setDescription("");}}>
                        Clear all fields
                    </button>
                    <button className='reportSubmit'>
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    )
}