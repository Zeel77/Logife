import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const Faq = () => {
    return (

        <div className='ml-[22%] px-[3vmax] pt-[6%] pb-4 bg-slate-100 w-[95%] h-[100vh]'>
            <div className='gap-2'>
                <p className='font-bold text-[2vmax] py-2'>FAQs</p>
                <Accordion className='rounded'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className='font-bold'
                    >
                        What information does the vessel table store?
                    </AccordionSummary>
                    <AccordionDetails>
                        The vessel table stores detailed information about each vessel in the fleet, including its name, callsign, gross tonnage (GRT), length overall (LOA), beam, height, and draft.
                    </AccordionDetails>
                </Accordion>
                <br/>
                <Accordion className='rounded-lg'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        className='font-bold'
                    >
                        How is the Height and Draft of a vessel measured and utilized?
                    </AccordionSummary>
                    <AccordionDetails>
                    The primary identifiers for a vessel are its name and callsign, which uniquely identify each vessel within the system.

                    </AccordionDetails>
                </Accordion>
                <br/>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        className='font-bold'
                    >
                        What is the significance of Length Overall (LOA) and Beam in vessel operations?
                    </AccordionSummary>
                    <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </AccordionDetails>
                </Accordion>
                <br/>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        className='font-bold'
                    >
                        How is the Gross Tonnage (GRT) calculated and used in vessel management?
                    </AccordionSummary>
                    <AccordionDetails>
                    The Gross Tonnage (GRT) represents the total enclosed volume of a vessel and is calculated based on specific formulas mandated by maritime regulations. It is used to determine various operational factors such as vessel size, port fees, and regulatory compliance.
                    </AccordionDetails>
                </Accordion>
                <br/>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        className='font-bold'
                    >
                        What are the primary identifiers for a vessel in the system?
                    </AccordionSummary>
                    <AccordionDetails>
                    The Height of a vessel refers to its vertical clearance, often measured from the waterline to the highest point on the vessel. Draft refers to the vertical distance between the waterline and the lowest point of the vessel's hull. These measurements are essential for safe navigation, especially in areas with shallow waters or overhead obstructions.
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default Faq