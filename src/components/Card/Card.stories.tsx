import type {Meta, StoryObj} from "@storybook/react"
import Card from "./Card"
import React from "react"

/* Modify this when adding varients to Cards */
const varients = ["default", "shadow", "rounded", "border"] as const
const sizes = ["sm", "md", "lg"] as const;
const backgroundColor = ["white", "black"] as const;
const textColor = ["white", "black", "red", "green", "brown", "yellow", "blue", "lightBlue"]

const meta: Meta<typeof Card> = {
    component: Card,
    title:"Components/Card",
    argTypes: {
        variant: {
            control: "select",
            options: varients
        },
        size: {
            control: "select",
            options: sizes,
        },
        backgroundColor: {
            control: "select",
            options: backgroundColor,
        },
        textColor: {
            control: "select",
            options: textColor,
        }
    }
}

export default meta;
type Story = StoryObj<typeof Card>;

/** Story for Default Variant */
export const Default: Story = {
    args: {
      variant: "default",
      size: "md",
      backgroundColor: "black",
      textColor: "white",
      title: "Default Card",
      paragraph: "This is the default card variant",
      imageURL: "./logo.png"
    },
  };
  
  /** Story for Shadow Variant */
  export const Shadow: Story = {
    args: {
      variant: "shadow",
      size: "sm",
      backgroundColor: "black",
      textColor: "red",
      title: "Shadow Card",
      paragraph: "This card has a shadow effect",
      imageURL: "./logo.png"
    },
  };
  
  /** Story for Rounded Variant */
  export const Rounded: Story = {
    args: {
      variant: "shadow",
      size: "lg",
      backgroundColor: "black",
      textColor: "green",
      title: "Rounded Card",
      paragraph: "This card has rounded corners",
      imageURL: "./logo.png"
    },
  };
  
  /** Story for Border Variant */
  export const Border: Story = {
    args: {
      variant: "border",
      size: "md",
      backgroundColor: "white",
      textColor: "blue",
      title: "Border Card",
      paragraph: "This card has a border outline",
      imageURL: "./logo.png"
    },
  };
  
  /** Story for Small Size */
  export const Small: Story = {
    args: {
      variant: "default",
      size: "sm",
      backgroundColor: "black",
      textColor: "yellow",
      title: "Small Card",
      paragraph: "This is a small-sized card",
      imageURL: "./logo.png"
    },
  };
  
  /** Story for Large Size */
  export const Large: Story = {
    args: {
      variant: "default",
      size: "lg",
      backgroundColor: "black",
      textColor: "lightBlue",
      title: "Large Card",
      paragraph: "This is a large-sized card",
      imageURL: "./logo.png"
    },
  };
  
  /** Story for Light Theme */
  export const LightTheme: Story = {
    args: {
      variant: "default",
      size: "md",
      backgroundColor: "black",
      textColor: "brown",
      title: "Light Theme Card",
      paragraph: "This card uses a light theme",
      imageURL: "./logo.png"
    },
  }; 

  /** Gallery Story for all Card Variants */
export const Gallery: Story = {
    args: {},
    render: (args) => {
      return (
        <div>
          {backgroundColor.map((bgColor) => {
            const isWhiteBackground = bgColor === "white";
            return (
              <div key={bgColor}>
                <div className={`grid grid-cols-2 gap-4 p-4 ${isWhiteBackground ? "bg-zinc-300" : "bg-zinc-800"}`}>
                  {varients.map((variant) => (
                    <React.Fragment key={variant}>
                      <div className="flex flex-col gap-4">
                        {sizes.map((size) => (
                          <div key={`${variant}-${size}`} className="flex justify-center p-2">
                            <Card 
                              variant={variant}
                              size={size}
                              backgroundColor={bgColor}
                              textColor={isWhiteBackground ? "black" : "white"}
                              title={`${size} | ${variant} | ${bgColor}`}
                              paragraph="This is a sample card description"
                              imageURL="./logo.png"
                            />
                          </div>
                        ))}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    },
  };

