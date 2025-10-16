import MediaCard from "@/design-system/components/MediaCard";
import Box from "@/design-system/primitives/Box";
import { Grid, GridCol, GridRow } from "@/design-system/primitives/Grid";

export default function AboutUsPage() {
  return (
    <Box className="flex justify-center">
      <Grid col span={2} gap={32}>
        <GridCol>
          <Grid row span={3} gap={4}>
            <GridRow>
              <MediaCard
                mediaType="image"
                mediaDirection="left"
                size="lg"
                title="Eboard"
                rounded="rounded"
                description="The Eboard team designs all the articles in the print issue of our magazine. The team holds workshops and uses Adobe InDesign to organize different article layouts, including quotes, photos, and graphic designs."
                imageProps={{
                  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
                  alt: "Sample image",
                }}
              />
            </GridRow>
            <GridRow>
              <MediaCard
                mediaType="image"
                mediaDirection="left"
                size="lg"
                title="Web & Software"
                rounded="rounded"
                description="The web & software team creates and maintains the current website. The team teaches its members important web development concepts and industry standards while producing software that benefits all other teams."
                imageProps={{
                  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
                  alt: "Sample image",
                }}
              />
            </GridRow>
            <GridRow>
              <MediaCard
                mediaType="image"
                mediaDirection="left"
                size="lg"
                title="Design"
                rounded="rounded"
                description="The design team designs all the articles in the print issue of our magazine. The team holds workshops and uses Adobe InDesign to organize different article layouts, including quotes, photos, and graphic designs."
                imageProps={{
                  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
                  alt: "Sample image",
                }}
              />
            </GridRow>
          </Grid>
        </GridCol>
        <GridCol>
          <Grid row span={3} gap={4}>
            <GridRow>
              <MediaCard
                mediaType="image"
                mediaDirection="left"
                size="lg"
                title="Writing"
                rounded="rounded"
                description="The writing team writes all articles that go into both the print and web versions of the magazine. Writers work with editors to ensure quality writing and transform complex research into accessible narratives that inform and inspire our readers."
                imageProps={{
                  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
                  alt: "Sample image",
                }}
              />
            </GridRow>
            <GridRow>
              <MediaCard
                mediaType="image"
                mediaDirection="left"
                size="lg"
                title="Photography"
                rounded="rounded"
                description="The photography team takes and edits the photos included throughout the magazine, from the cover to the articles. Members can expect to attend photo workshops and trips, and even partake in contests!"
                imageProps={{
                  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
                  alt: "Sample image",
                }}
              />
            </GridRow>
            <GridRow>
              <MediaCard
                mediaType="image"
                mediaDirection="left"
                size="lg"
                title="Social Media & Outreach"
                rounded="rounded"
                description="The outreach team organizes weekly events for the magazine. The team reaches out to other clubs to organize collab events as well as interested members to recruit them into joining the magazine. "
                imageProps={{
                  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
                  alt: "Sample image",
                }}
              />
            </GridRow>
          </Grid>
        </GridCol>
      </Grid>
    </Box>
  );
}
