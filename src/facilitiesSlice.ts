import { createSlice } from "@reduxjs/toolkit";
import { Facility } from "./common/models/Facility";
import { v4 as uuid } from 'uuid';

interface FacilitiesState {
  value: Facility[];
}

const initialState: FacilitiesState = {
  value: [
    {
      id: uuid(),
      name: "Royal Golf Center",
      address: "456 Golf Lane, Aarhus, Denmark",
      description: "Only accepting Kings and Queens! No commoners allowed.",
      coverImageUrl:
        "https://golf-pass.brightspotcdn.com/dims4/default/37986a7/2147483647/strip/true/crop/5184x3096+0+180/resize/1440x860!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2F0b%2F86%2Fb22da403f153727774b7e3ed3846%2Fp.php",
      openTime: "09:00",
      closeTime: "19:00",
      isFavorite: true,
    },
    {
      id: uuid(),
      name: "Green Valley Golf Club",
      address: "123 Fairway Drive, Copenhagen, Denmark",
      description:
        'Maybe our name should be "Green Valley Golf Clubs"? We don\'t just have one club to use, we promise!',
      coverImageUrl:
        "https://images.golfwisconsin.com/courselarge/thevalley_wi1.jpg",
      openTime: "08:00",
      closeTime: "20:00",
      isFavorite: false,
    },
    {
      id: uuid(),
      name: "Nordic Hills Golf Resort",
      address: "789 Birdie Street, Odense, Denmark",
      description:
        'You are going to look at these hills and say, "Wow, those sure are Nordic!"',
      coverImageUrl:
        "https://southdelsidekick.com/media/markets/so-del/images/listings/562/eb78ad86c376bd478189d7bba356204c.jpg?w=880&h=660&zoomfit=1",
      openTime: "07:00",
      closeTime: "19:00",
      isFavorite: false,
    },
    {
      id: uuid(),
      name: "Blue Lake Golf Club",
      address: "101 Par Avenue, Aalborg, Denmark",
      description:
        "Please don't hit any more balls into the Blue Lake. We are running out!",
      coverImageUrl:
        "https://s3.us-east-2.amazonaws.com/reynoldsdotcomassets/images/golf-course/GW.11.2.Kirk-min.jpg",
      openTime: "12:00",
      closeTime: "22:00",
      isFavorite: false,
    },
    {
      id: uuid(),
      name: "Sunset Golf Park",
      address: "555 Eagle Way, Esbjerg, Denmark",
      description:
        "We are only open during sunset! How are we still in business?",
      coverImageUrl:
        "https://img1.wsimg.com/isteam/ip/c368eeb6-16d0-4969-abd7-4df6b4158de7/Sunset%20Hole%20%234.jpg",
      openTime: "20:00",
      closeTime: "20:15",
      isFavorite: false,
    },
    {
      id: uuid(),
      name: "Copenhagen Golf Park",
      address: "12 Golfvej, Copenhagen, Denmark",
      description:
        "Looking for a place to practice golf and baseball? It's not here. We only have golf.",
      coverImageUrl:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/a4/17/0b/hole-18-new-course.jpg?w=500&h=500&s=1",
      openTime: "12:00",
      closeTime: "15:00",
      isFavorite: false,
    },
  ],
};

export const facilitiesSlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {
    addFacility: (state, action) => {
        const newFacility: Facility = action.payload;
        state.value.push(newFacility);
        state.value.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
    },
    editFacility: (state, action) => {
        const updatedFacility: Facility = action.payload;
        const index = state.value.findIndex((facility) => facility.id === updatedFacility.id);
        if (index !== -1) {
            state.value[index] = updatedFacility;
            state.value.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
        }
    },
    setFavorite: (state, action) => {
        const facilityId = action.payload;
        state.value.forEach((facility) => {
            facility.isFavorite = facility.id === facilityId;
        });
        state.value.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
    },
    deleteFacility: (state, action) => {
        const facilityId = action.payload;
        state.value = state.value.filter((facility) => facility.id !== facilityId);

        if (state.value.length > 0 && !state.value.some((facility) => facility.isFavorite)) {
            state.value[0].isFavorite = true;
        }
    },
  },
});

export const { addFacility, editFacility, setFavorite, deleteFacility } = facilitiesSlice.actions;