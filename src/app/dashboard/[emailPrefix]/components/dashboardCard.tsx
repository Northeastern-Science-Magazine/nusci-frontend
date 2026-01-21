
import Button from "@/design-system/primitives/Button"
import Text from "@/design-system/primitives/Text"

//add props to include function for rerouting to other pages based on which button is clicked
// 


export default function DashboardCard ({ text }: { text: string }) {
    return (
        <Button color = "gray-light" width = {256} height = {128} mx = {10} my={12} animation="scale110Hover"
        className="flex items-center justify-center shadow-lg" opacity = {60}>
            <Text size={24} className="text-center whitespace-normal break-words" opacity = {100}> {text} </Text>
        </Button>
    )
}