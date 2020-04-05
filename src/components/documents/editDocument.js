import React, {Component, useState} from "react";
import {Link, withRouter} from 'react-router-dom';
import { useForm } from 'react-hook-form'

// props: onEditDocument, theDocumentInfo, theCaseId, courts, loggedInEmployee

// fixme: When editing a doc, the createdBy field also changes to the editor. Maybe it should stay as before

const EditDocument = (props) => {

    // constructor(props) {
    //     super();
    //
    //     this.state = {
    //         selectedOption: props.courts[0].id
    //     };
    //
    //     console.log(props.courts)
    // }

    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const [selectedOption, setSelectedOpt] = useState(props.courts[0].id);

    const handleOptionChange = (e) =>{

        //console.log(e.target.value)

        // this.setState({
        //     selectedOption: e.target.value
        // })
        setSelectedOpt(e.target.value);
    };


    const onFormSubmit = (formData) =>{
        //formData.preventDefault();

        const editedDoc = {
          "archiveNumber": formData.doc_archiveNumber,
          "isInput": formData.doc_isInput,
          "documentDate": formData.doc_date,
          "employeeId": props.loggedInEmployee.id,
          "courtId": selectedOption,
          "caseId": props.theCaseId
        };

        const oldId = props.theDocumentInfo.id;

        //console.log(editedDoc)
        props.onEditDocument(editedDoc,oldId);

        props.history.push("/documents/"+props.theCaseId);
        //props.history.push("/cases");
    };


    // render() {
        return(
            <div>
                <h3>Edit the info for {props.theDocumentInfo.name}</h3>
                <br/>

                <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                    <label htmlFor={"doc_archiveNumber"}>New archive number:</label>
                    <input type={"text"} name={"doc_archiveNumber"}
                           defaultValue={props.theDocumentInfo.archiveNumber}
                           ref={register({
                               required: true,
                               pattern:{
                                   value: /^[0-9]*$/,
                               }
                           })}/>
                    {errors.doc_archiveNumber && errors.doc_archiveNumber.type === "required" &&
                    <p>Archive number is required!</p>}
                    {errors.doc_archiveNumber && errors.doc_archiveNumber.type === "pattern" &&
                    <p>Must only contain numbers!</p>}
                    <br/><br/>

                    <input type={"checkbox"} name={"doc_isInput"} defaultChecked={props.theDocumentInfo.input}
                    ref={register()}/>
                    Is this document an input document to our company?
                    <br/><br/>

                    <label htmlFor="doc_date">New input date:</label>
                    <div>
                        <input type="date" name={"doc_date"} id="doc_date_id"
                               ref={register({
                                   required: true
                               })}/>
                        {errors.doc_date && <p>Date is required!</p>}
                    </div>
                    <br/><br/>


                    {props.courts.map((c,kluc) =>
                        <div key={kluc}>
                        <input type={"radio"}
                               //id={c.id}
                               name={"court"}
                               value={c.id}
                               defaultChecked={selectedOption === c.id}
                               onChange={handleOptionChange}

                        />

                        <label htmlFor={"court"}>{c.name}</label>
                        </div>
                    )}

                    <button type="submit">Submit</button>
                    <button type={"reset"}>Reset</button>
                    <Link to={"/documents/"+props.theCaseId}>
                        <button>Cancel</button>
                    </Link>
                </form>
            </div>
        )
    // }
};


export default withRouter(EditDocument);