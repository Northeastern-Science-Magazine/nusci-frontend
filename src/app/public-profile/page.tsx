import Header from "@/design-system/components/Header/Header"
import {GridCol, Grid} from  "@/design-system/primitives/Grid/Grid"
import { GridColProps, GridVariants } from "@/design-system/primitives/Grid/variants"
import { Avatar } from "@/design-system/primitives/Avatar/Avatar"
import Text from "@/design-system/primitives/Text/Text"

export default function PublicProfilePage() {
    return (
    <div>
      <Header/>
      <Grid col span={3 as GridVariants["span"]} gap={2} >
        <GridCol span={1 as GridColProps["span"]} >
          <Avatar
            src="https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg"
            alt="A blue suregeon fish avatar"
            fallback="SX"
            size={'lg'}
            />
        </GridCol>
        <GridCol span={2 as GridColProps["span"]} >
          <Text
            style="bold"
            size= {72}
            color= "aqua"
            >
              John
            </Text>
            <Text
            style="bold"
            size= {72}
            color= "aqua"
            >
              Doe
            </Text>
            <Text
            style="regular"
            size= {36}
            color= "black"
            >
              Pronouns: He/Him
            </Text>
            <Text
            style="regular"
            size= {36}
            color= "black"
            >
              Graduation Year: 2027
            </Text>
            <Text
            style="regular"
            size= {36}
            color= "black"
            >
              Major: Computer Science
            </Text>
        </GridCol>
        </Grid>
    </div>
    )
  }
  