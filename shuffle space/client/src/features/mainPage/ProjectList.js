import {Box, makeStyles} from "@material-ui/core";
import CustomerProjectCards from "./ProjectCard";


const ProjectList = ({customers, user, scanBarcodeFunction}) => {
    return (
        <Box style={{marginLeft:"1%"}}>
            {customers.map((c, index) => <CustomerProjectCards user={user} customer={c} key={index} scanBarcodeFunction={scanBarcodeFunction}/>)}
        </Box>
    )
}

export default ProjectList