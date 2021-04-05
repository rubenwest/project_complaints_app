import {useEffect, useState} from 'react';
import {getIncidents} from '../services/index';
import '../css/userMenu.css';
import jwt_decode from "jwt-decode";
import Loading from '../components/Global_Components/Loading';
import 'semantic-ui-css/semantic.min.css'; 
import ListIncidents from '../components/User_Components/ListIncidents';
import NewIncident from '../components/User_Components/NewIncident';
import SidebarUser from '../components/User_Components/SidebarUser';
import SidebarVertical from '../components/User_Components/SidebarVertical';
import Footer from '../components/Global_Components/Footer'

/* import SidebarVertical from '../components/Admin_Components/SidebarVerticalAdmin'; */


function UserMenu() {
    
    console.log("UserMenu");

    const token = localStorage.getItem("token");
    const userLoged = jwt_decode(token); 
    const email = userLoged.user.email;
    
    console.log("Cargamos1 Incidencias de: ",email);
    const [incidents, setIncidents] = useState([]);
    const [filters, setFilters] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [countIncidents, setCountIncidents] = useState(0);
    
    /* getAllIncidents(); */
  /*   loadIncidents(email); */
    
    async function loadIncidents(email) {

        const resGetIncidents =  await getIncidents(email);

        if (resGetIncidents.status === 201) {

            setIncidents(resGetIncidents.data.incidents) 
            /* console.log(incidents); */ 
            let incidentsActives = resGetIncidents.data.incidents.filter( (incident) => incident.state == 'En proceso')
            setCountIncidents(incidentsActives.length);
            
        }
        setIsLoading(false);
    }

    useEffect( ()=>{
        loadIncidents(email);
    },[])

        return (
        <>
        <div className="bg-gra-menu">
{/*             <Container>
                <Navbar />
            </Container> */}
            <header>
            
            <SidebarUser />
            </header>


            {
               isLoading && <Loading />
            }

            {
                /* !isLoading && incidents.length && <ListIncidents incidents={incidents}/> */
                !isLoading && incidents.length && (
                    
                        <div className=" d-flex-normal-2">
                            <SidebarVertical countIncidents={countIncidents} setCountIncidents= {setCountIncidents} filters={filters} setFilters= {setFilters}/>
                            <div className='container'>
                                <ListIncidents incidents={incidents} setIncidents={setIncidents} filters={filters} countIncidents={countIncidents} setCountIncidents = {setCountIncidents}/>
                                <NewIncident />
                            </div>
                        </div>
                )
            }
            {
                !isLoading && !incidents.length && (
                    
                        <div className=" d-flex-normal">
                            <NewIncident />
                        </div>
                )
            }
        </div> 
        <Footer />
        </>
    )
};
    

export default UserMenu;