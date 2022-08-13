import React from 'react'; import './Body.css';
import ItemsRaffle from '../Items/utils/addons/ItemsRaffle';
import ItemsWhitelist from '../Items/utils/addons/ItemsWhitelist';
import ItemsFinished from '../Items/utils/addons/ItemsFinished';

import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";

interface BodyProps {

}

const Body: React.FC<BodyProps> = ({ }) => {
    const data = [
        {
            label: "Raffles",
            value: "raffles",
            desc: <ItemsRaffle />
        },
        {
            label: "Whitelists",
            value: "whitelist",
            desc: <ItemsWhitelist />
        },
        {
            label: "Past Raffles",
            value: "past",
            desc: <ItemsFinished />
        }
    ]

    return (
        <div className='text-white'>
            <div className='md:p-6'>
                <Tabs value="raffles">
                    <TabsHeader className='grid grid-flow-col-dense place-content-center h-[60px] bg-[#0f0f0f]'>
                        {data.map(({ label, value }) => (
                            <Tab className='font-bold md:w-[125px] text-[12px] md:text-[16px] h-[40px] mr-4 rounded-md tab-text mt-[-4px] md:h-[50px] bg-[#0f0f0f] hover:bg-[#242331]' key={value} value={value}>
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody className='rounded-xl'>
                        {data.map(({ value, desc }) => (
                            <TabPanel className='p-0 pt-5' key={value} value={value}>
                                {desc}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </div>
        </div>
    )
}

export default Body