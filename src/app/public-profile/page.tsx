import Header from "@/design-system/components/Header/Header"
import {GridCol, Grid} from  "@/design-system/primitives/Grid/Grid"
import { GridColProps, GridVariants } from "@/design-system/primitives/Grid/variants"
import { Avatar } from "@/design-system/primitives/Avatar/Avatar"
import Text from "@/design-system/primitives/Text/Text"
import { Image } from '@/design-system/primitives/Image/Image'
import Card from "@/design-system/primitives/Card"
import { Badge } from "@/design-system/primitives/Badge/Badge"

export default function PublicProfilePage() {
    return (
    <div className = "ml-36 mr-36">
      <Header/>
      <div className="relative w-full bg-gray-200">
        <Image
          src="https://cdn2.picryl.com/photo/2018/03/17/boston-skyline-46674726272-fcd26e-1024.jpg"
          alt="Banner"
          width="w-full"
          ratio= {18/4}
          rounded={'rounded'}
        />
        <div className="absolute -bottom-20 left-20">
         <Avatar
            src="https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg"
            alt="A blue suregeon fish avatar"
            fallback="SX"
            size={'lg'}
            />
            </div>
        </div>
      <Grid col span={3 as GridVariants["span"]} gap={2} >
        <GridCol span={1 as GridColProps["span"]} className="mb-20" >
        <Card color="white" className = "mt-24 shadow-xl">
        <Text
            style="regular"
            size= {20}
            color= "aqua"
            >
              Pronouns: He/Him
            </Text>
            <Text
            style="regular"
            size= {20}
            color= "aqua"
            >
              Graduation Year: 2027
            </Text>
            <Text
            style="regular"
            size= {20}
            color= "aqua"
            >
              Major: Computer Science
            </Text>
            <Text
            style="regular"
            size= {20}
            color= "aqua"
            >
              Location: Boston
            </Text>
            <Text
            style="regular"
            size= {20}
            color= "aqua"
            >
              Email: jdoe@northeastern.edu
            </Text>
            </Card>
        </GridCol>
        <GridCol span={2 as GridColProps["span"]} >
        <div className="flex items-center gap-6 ml-10">
      <Text
        style="bold"
        size={72}
        color="aqua-light"
      >
        John Doe
      </Text>
      <Badge color="aqua" variant="default" className="mt-4">
        Author
      </Badge>
    </div>
          <Text
            style="regular"
            size= {16}
            color="black"
            className= "mr-10 ml-10"
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. 
            </Text>
        </GridCol>
        </Grid>
        <Card color="white" className = "mt-10 shadow-xl flex justify-center">
          <Text style="underline" color="aqua" size={48}>
            Articles
          </Text>
          </Card> 
    </div>
    )
  }
  
  