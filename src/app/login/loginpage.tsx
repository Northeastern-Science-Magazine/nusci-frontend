// import { Form, FormField } from "@/primitivees/Form";

import Image from "@/primitives/Image"
import {Grid, GridCol} from "@/primitives/Grid";
import Box from "@/primitives/Box";
import Text from "@/primitives/Text";
import Button from "@/primitives/Button";
import Card from "@/primitives/Card";
import Logo from "../../../public/logo.png"

export default function Loginpage() {
    return (
        <Grid col span={2}  gap={2}>
            
                <GridCol> 
                    <Image src={Logo.src} alt="logo" width="w-[50px]" emphasis="default"/>
                    <Text size={48} style="bold" className="pl-12 pt-36"> Welcome back to NuSci! </Text>
                </GridCol>
                 <GridCol> 
                <Image src="https://www.sciencephoto.com/_generated/custom/131/27d0ea2c.jpg" alt="landing" width="w-full" emphasis="default"/>
                 </GridCol>
                 
        </Grid>
    );
    }