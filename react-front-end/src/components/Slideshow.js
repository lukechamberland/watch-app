import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import slideshow1 from '../images/slideshow1.jpg';
import slideshow2 from '../images/slideshow2.jpg';
import slideshow3 from '../images/slideshow3.jpg';
import slideshow4 from '../images/slideshow4.jpg';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath:
      slideshow1,
  },
  {
    imgPath:
    slideshow2,
  },
  {
    imgPath:
      slideshow3,
  },
  {
    imgPath:
      slideshow4,
  },
];

function Slideshow() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 512,
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  marginBottom: "20px",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default Slideshow;
