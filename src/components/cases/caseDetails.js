import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';


// fixme: vo sekoj emp ima lista createdCases, ti treba da gi zemes site emps (vise gi loadas od <App>),
// da proveris za sekoj od niv vo created cases da ne go ima slucajno ovoj case (props.parentCase) i koga ke se najde koj e
// da se renderne vo tabela


const CaseDetails = (props) =>{

    const defaultOption = "cc";

    const [selectedChildCase, setChildCase]=useState({
        caseNumber: 0,
        name: "tmp name",
        createdAt: "tmp date",
        basis: "tmp basis",
        value:"tmp value",
        executed: false,
        proxy: "tmp proxy",
        phase: "tmp phase",
        id: 0
    });

    // const [casePlaintiffSued, setPlaintiffSued] = useState({
    //    plaintiff:{
    //        id: 0
    //    },
    //    sued:{
    //        id: 0
    //    }
    // });

    const [casePlaintiff, setPlaintiff] = useState({
        id: 0
    });

    const [caseSued, setSued] = useState({
        id: 0
    });




    useEffect(() => {


        axios({
            method: "get",
            url: "http://localhost:8080/cases/getPlaintiff/"+props.parentCase.id,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        }).then(resp =>{
            // setPlaintiffSued({...casePlaintiffSued,
            //     plaintiff: resp.data
            // })

            setPlaintiff(resp.data)
        });

        axios({
            method: "get",
            url: "http://localhost:8080/cases/getSued/"+props.parentCase.id,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        }).then(resp =>{
            // setPlaintiffSued({...casePlaintiffSued,
            //     sued: resp.data
            // })

            setSued(resp.data)

        });




    },[]);


    //fixme
    const getPlaintiffAndSuedOfChildCase = (childCaseId) =>{


    };


    const showChildCase = () =>{

      if (selectedChildCase.name === "tmp name"){
          return <tr/>
      }
      else{
          return <tr bgcolor="#f7da63">
                  <td>{selectedChildCase.caseNumber}</td>
                  <td>{selectedChildCase.name}</td>
                  <td>{selectedChildCase.createdAt}</td>
                  <td>{selectedChildCase.basis}</td>
                  <td>{selectedChildCase.value}</td>
                  <td>{selectedChildCase.executed.toString()}</td>
                  <td>{selectedChildCase.proxy}</td>

                  <td>TMP</td>
                  <td>TMP</td>

                  <td>

                      <Link to={{
                          pathname: "/employees/"+selectedChildCase.id,
                          caseId: selectedChildCase.id
                      }}>
                          <button>All Employees</button>
                      </Link>

                      <Link to={"/employees/add"}>
                          <button>Add new employee</button>
                      </Link>
                  </td>
                  <td>
                      <Link to={{
                          pathname: "/documents/"+selectedChildCase.id,
                          caseId: selectedChildCase.id
                      }}>
                          <button>All documents</button>
                      </Link>

                      <Link to={"/documents/add"}>
                          <button>Add document</button>
                      </Link>
                  </td>
                  <td>{selectedChildCase.phase}</td>
                  <td>
                      <Link to={"/cases/edit"}>
                          <button>Edit</button>
                      </Link>

                      <button>Delete</button>

                  </td>
                </tr>
      }
    };

    const onSelect = (e) =>{

        let selectedCase = props.allCases.filter(c =>{
            return c.name === e.value
        });

        setChildCase(selectedCase[0]);
    };

    //fixme ne cepkas
    const loadChildCasesNames = (parentCaseId) =>{
        let menuOptions = [];

        props.allCases.filter(c =>{
            if (c.parentCase != null && parentCaseId == c.parentCase.id){
                menuOptions.push(c.name)
            }
        });

        //console.log(menuOptions);

        return menuOptions;
    };

    //fixme ne cepkas
    const renderPlaintiff = () =>{

        if (casePlaintiff === undefined)
            return <td/>;
        else
            return <td>{casePlaintiff.name}</td>
    };

    //fixme ne cepkas
    const renderSued = () =>{
        if (caseSued === undefined)
            return <td/>;
        else
            return <td>{caseSued.name}</td>;
    };


    // const renderParentCases = () =>{
    //
    //     if (props.parentCase.parentCase == null){
    //         return(
    //             <tr>
    //                 <td>{props.parentCase.caseNumber}</td>
    //                 <td>{props.parentCase.name}</td>
    //                 <td>{props.parentCase.createdAt}</td>
    //                 <td>{props.parentCase.basis}</td>
    //                 <td>{props.parentCase.value}</td>
    //                 <td>{props.parentCase.executed.toString()}</td>
    //                 <td>{props.parentCase.proxy}</td>
    //                 {renderPlaintiff()}
    //                 {renderSued()}
    //
    //                 <td>
    //
    //                     <Link to={{
    //                         pathname: "/employees/"+props.parentCase.id,
    //                         caseId: props.parentCase.id
    //                     }}>
    //                         <button>All Employees</button>
    //                     </Link>
    //
    //                     <Link to={"/employees/add"}>
    //                         <button>Add new employee</button>
    //                     </Link>
    //                 </td>
    //                 <td>
    //                     <Link to={{
    //                         pathname: "/documents/"+props.parentCase.id,
    //                         caseId: props.parentCase.id
    //                     }}>
    //                         <button>All documents</button>
    //                     </Link>
    //
    //                     <Link to={"/documents/add"}>
    //                         <button>Add document</button>
    //                     </Link>
    //                 </td>
    //                 <td>{props.parentCase.phase}</td>
    //                 <td>
    //                     <Link to={"/cases/edit"}>
    //                         <button>Edit</button>
    //                     </Link>
    //
    //                     <button>Delete</button>
    //
    //                     <Dropdown options={loadChildCasesNames(props.parentCase.id)} onChange={onSelect} value={defaultOption} placeholder="Child cases" />
    //                 </td>
    //             </tr>
    //         )
    //     }
    //     else{
    //         return <tr/>
    //     }
    //
    // };


    //console.log(props.allCases);
    //console.log(props.parentCase);


    console.log(props.parentCase.name,"---",casePlaintiff.name);


    return(

        <tbody>

            {/*{renderParentCases()}*/}

            <tr>
                <td>{props.parentCase.caseNumber}</td>
                <td>{props.parentCase.name}</td>
                <td>{props.parentCase.createdAt}</td>
                <td>{props.parentCase.basis}</td>
                <td>{props.parentCase.value}</td>
                <td>{props.parentCase.executed.toString()}</td>
                <td>{props.parentCase.proxy}</td>
                {renderPlaintiff()}
                {renderSued()}

                <td>

                    <Link to={{
                        pathname: "/employees/"+props.parentCase.id,
                        caseId: props.parentCase.id
                    }}>
                        <button>All Employees</button>
                    </Link>

                    <Link to={"/employees/add"}>
                        <button>Add new employee</button>
                    </Link>
                </td>
                <td>
                    <Link to={{
                        pathname: "/documents/"+props.parentCase.id,
                        caseId: props.parentCase.id
                    }}>
                        <button>All documents</button>
                    </Link>

                    <Link to={"/documents/add"}>
                        <button>Add document</button>
                    </Link>
                </td>
                <td>{props.parentCase.phase}</td>
                <td>
                    <Link to={"/cases/edit"}>
                        <button>Edit</button>
                    </Link>

                    <button>Delete</button>

                    <Dropdown options={loadChildCasesNames(props.parentCase.id)} onChange={onSelect} value={defaultOption} placeholder="Child cases" />
                </td>
            </tr>

            {showChildCase()}

        </tbody>


    )

};

export default CaseDetails;