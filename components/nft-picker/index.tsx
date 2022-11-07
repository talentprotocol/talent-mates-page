import { useState } from "react";
import Image from "next/image";
import {
  Header,
  ButtonIcon,
  TitleArea,
  PickerArea,
  TraitPickerArea,
  DisplayArea,
  GenderPicker,
  ImageHolder,
  TraitArea,
  TraitSwitchArea,
  TraitSwitchButton,
  TraitSwitchInfo
} from "./styled";
import { Button, Typography } from "shared-ui";
import NFTImage from "../assets/output.png";
import { TraitProps } from "./types";
import TRAITS from "./trait_list.json";

const Trait = ({ description, trait, onTraitSelection, currentTraitNumber, totalNumberOfTraits }: TraitProps) => (
  <TraitArea>
    <Typography
      type="body1"
      text={description}
      color="BLACK"
    />
    <TraitSwitchArea>
      <Button
        type="button"
        variant="quaternary"
        onClick={(e: any) => onTraitSelection(e, trait, "previous")}
      >
        <TraitSwitchButton>--W</TraitSwitchButton>
      </Button>
      <Button
        type="button"
        variant="quaternary"
        onClick={(e: any) => onTraitSelection(e, trait, "next")}
      >
        <TraitSwitchButton>--E</TraitSwitchButton>
      </Button>
      <TraitSwitchInfo>
        <p>{currentTraitNumber}/{totalNumberOfTraits}</p>
      </TraitSwitchInfo>
    </TraitSwitchArea>
  </TraitArea>
)

export const NFTPicker = () => {
  const [options, setOptions] = useState({
    background: "01",
    skin: "01",
    hair: "01",
    clothes: "01",
    mouth: "01",
    eyes: "01",
    thinking_cloud: "01",
    background_object: "01",
    acessories: "01",
    gender: "male",
  });

  const getURLForOption = (trait: any, option: string) => {
    // @ts-ignore
    const baseURL = "https://d6cu1tnva62p2.cloudfront.net"
    
    const urlTrait = () => {
      switch(trait) {
        case "background":
          return "background";
        case "skin":
          return "body";
        case "hair":
          return "hair";
        case "clothes":
          return "clothing";
        case "mouth":
          return "mouth";
        case "eyes":
          return "eyes";
        case "thinking_cloud":
          return "thinking";
        case "background_object":
          return "back";
        case "acessories":
          return "acessories";
      }
    }

    // Example: https://d6cu1tnva62p2.cloudfront.net/body/male/01.png
    // @ts-ignore
    return `${baseURL}/${urlTrait()}/${options.gender}/${options[option]}`
  }

  const onTraitSelection = (e: any, trait: string, option: string) => {
    e.preventDefault();
    console.log("CALLBACK");
    console.log("TRAIT: ", trait);
    console.log("OPERATION: ", option);
  }

  return (
  <>
    <Header>
      <Button
        text={"Back"}
        type="link"
        variant="secondary"
        href="/"
      >
        <ButtonIcon>--W</ButtonIcon>
      </Button>
      <TitleArea>
        <Typography
          type="h3"
          text={"Customize your Talent Protocol MATE."}
          color="BLACK"
        />
      </TitleArea>
    </Header>
    <PickerArea>
      <TraitPickerArea>
        <Trait
          trait={"background"}
          description={"Background"}
          onTraitSelection={onTraitSelection}
          currentTraitNumber={1}
          totalNumberOfTraits={8}
        />
        <Trait
          trait={"skin"}
          description={"Skin"}
          onTraitSelection={onTraitSelection}
          currentTraitNumber={1}
          totalNumberOfTraits={9}
        />
        <Trait
          trait={"hair"}
          description={"Hair"}
          onTraitSelection={onTraitSelection}
          currentTraitNumber={1}
          totalNumberOfTraits={10}
        />
        <Trait
          trait={"clothes"}
          description={"Clothes"}
          onTraitSelection={onTraitSelection}
          currentTraitNumber={1}
          totalNumberOfTraits={11}
        />
      </TraitPickerArea>
      <DisplayArea>
        <GenderPicker>
          <Button
            text="Male"
            type="button"
            variant="quaternary"
            fullWidth
            onClick={(e: any) => onTraitSelection(e, "gender", "male")}
          />
          <Button
            text="Female"
            type="button"
            variant="secondary"
            fullWidth
            onClick={(e: any) => onTraitSelection(e, "gender", "female")}
          />
        </GenderPicker>
        <ImageHolder>
          <Image priority src={NFTImage} alt="NFT preview" />
        </ImageHolder>
      </DisplayArea>
      <TraitPickerArea>
        <Trait
          trait={"mouth"}
          description={"Mouth"}
          onTraitSelection={onTraitSelection}
          currentTraitNumber={1}
          totalNumberOfTraits={8}
        />
        <Trait
          trait={"eyes"}
          description={"Eyes"}
          onTraitSelection={onTraitSelection}
          currentTraitNumber={1}
          totalNumberOfTraits={9}
        />
        <Trait
          trait={"thinking_cloud"}
          description={"Thinking Cloud"}
          onTraitSelection={onTraitSelection}
          currentTraitNumber={1}
          totalNumberOfTraits={10}
        />
        <Trait
          trait={"background_object"}
          description={"Background Object"}
          onTraitSelection={onTraitSelection}
          currentTraitNumber={1}
          totalNumberOfTraits={11}
        />
      </TraitPickerArea>
    </PickerArea>
  </>
)};
