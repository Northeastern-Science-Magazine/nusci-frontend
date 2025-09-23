import Header from "@/design-system/components/Header/Header"
import {GridCol, Grid} from  "@/design-system/primitives/Grid/Grid"
import { GridColProps, GridVariants } from "@/design-system/primitives/Grid/variants"
import { Avatar } from "@/design-system/primitives/Avatar/Avatar"
import Text from "@/design-system/primitives/Text/Text"

export default function PublicProfilePage() {
    return (
    <div>
      <Header/>
      <div className="relative w-full h-48 bg-gray-200">
        <img
          src="https://cdn2.picryl.com/photo/2018/03/17/boston-skyline-46674726272-fcd26e-1024.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-16 left-20">
         <Avatar
            src="https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg"
            alt="A blue suregeon fish avatar"
            fallback="SX"
            size={'lg'}
            />
            </div>
        </div>
      <Grid col span={3 as GridVariants["span"]} gap={2} >
        <GridCol span={1 as GridColProps["span"]} >
          <div className = "mt-24 ml-14">
        <Text
            style="regular"
            size= {24}
            color= "aqua"
            >
              Pronouns: He/Him
            </Text>
            <Text
            style="regular"
            size= {24}
            color= "aqua"
            >
              Graduation Year: 2027
            </Text>
            <Text
            style="regular"
            size= {24}
            color= "aqua"
            >
              Major: Computer Science
            </Text>
            <Text
            style="regular"
            size= {24}
            color= "aqua"
            >
              Location: Boston
            </Text>
            <Text
            style="regular"
            size= {24}
            color= "aqua"
            >
              Email: jdoe@northeastern.edu
            </Text>
            <Text
            style="regular"
            size= {24}
            color= "aqua"
            >
              Roles: Author
            </Text>
            </div>
        </GridCol>
        <GridCol span={2 as GridColProps["span"]} >
          <Text
            style="bold"
            size= {72}
            color= "aqua-light"
            >
              John Doe
            </Text>
          <Text
            style="regular"
            size= {16}
            color="black"
            className= "mr-10"
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. 
            </Text>
        </GridCol>
        </Grid>
    </div>
    )
  }
  
  