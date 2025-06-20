
import React from "react";
import { useRef, useState } from "react";

import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox, Form, Schema, TimePicker, type FormInstance } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { v4 as uuid } from "uuid";

import type { RootState } from "../../store";
import "./facility-form.scss";


const FacilityForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>(null);

  const { facilityId } = useParams<{ facilityId: string }>();
  const editMode: boolean = !!facilityId;

  const existingFacility = useSelector(
    (state: RootState) => state.facilities.value
  ).find((facility) => facility.id === facilityId);

  const forceFavorite = useSelector(
    (state: RootState) => state.facilities.value.length === 0
  );

  const [name, setName] = useState(
    existingFacility ? existingFacility.name : ""
  );
  const [address, setAddress] = useState(
    existingFacility ? existingFacility.address : ""
  );
  const [description, setDescription] = useState(
    existingFacility ? existingFacility.description : ""
  );
  const [coverImageUrl, setCoverImageUrl] = useState(
    existingFacility ? existingFacility.coverImageUrl : ""
  );
  const [openTime, setOpenTime] = useState(
    existingFacility ? existingFacility.openTime : ""
  );
  const [closeTime, setCloseTime] = useState(
    existingFacility ? existingFacility.closeTime : ""
  );
  const [isFavorite, setIsFavorite] = useState(
    forceFavorite || (existingFacility ? existingFacility.isFavorite : false)
  );

  const model = Schema.Model({
    name: Schema.Types.StringType().isRequired("Facility name is required"),
    address: Schema.Types.StringType().isRequired("Address is required"),
    description: Schema.Types.StringType().isRequired(
      "Description is required"
    ),
    coverImageUrl: Schema.Types.StringType().isRequired(
      "Cover image URL is required"
    ),
    openTime: Schema.Types.StringType().isRequired("Open time is required"),
    closeTime: Schema.Types.StringType().isRequired("Close time is required"),
  });

  const handleCheckboxChange = (_value: any, checked: boolean) => {
    setIsFavorite(checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log(formRef);
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch({ type: "facilities/setFavorite", payload: facilityId });
    }

    if (!editMode) {
      const newFacility = {
        id: uuid(),
        name,
        address,
        description,
        coverImageUrl,
        openTime,
        closeTime,
        isFavorite,
      };

      dispatch({ type: "facilities/addFacility", payload: newFacility });
    } else {
      const editedFacility = {
        id: facilityId,
        name,
        address,
        description,
        coverImageUrl,
        openTime,
        closeTime,
        isFavorite,
      };

      dispatch({ type: "facilities/editFacility", payload: editedFacility });
    }

    navigate("/facilities");
  };

  return (
    <div>
      <Form ref={formRef} model={model} fluid>
        <div>
          <h2>{!existingFacility ? "Create a New" : "Edit"} Facility</h2>
        </div>
        <div className="facility-form" style={{ backgroundColor: "#ffffff" }}>
          <div>
            <h3>Facility Information</h3>
          </div>
          <div>
            <Form.Group controlId="facility-information">
              <Form.ControlLabel>Facility Name *</Form.ControlLabel>
              <Form.Control name="name" value={name} onChange={setName} />
            </Form.Group>
            <Form.Group controlId="facility-address">
              <Form.ControlLabel>Address *</Form.ControlLabel>
              <Form.Control
                name="address"
                value={address}
                onChange={setAddress}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="facility-description">
              <Form.ControlLabel>Description *</Form.ControlLabel>
              <Form.Control
                name="description"
                rows={4}
                value={description}
                onChange={setDescription}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="facility-cover-image">
              <Form.ControlLabel>Cover Image URL *</Form.ControlLabel>
              <Form.Control
                name="coverImageUrl"
                value={coverImageUrl}
                onChange={setCoverImageUrl}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="facility-favorite">
              <Form.ControlLabel>
                <Checkbox
                  checked={isFavorite}
                  onChange={handleCheckboxChange}
                  disabled={forceFavorite}
                />
                Default Facility
              </Form.ControlLabel>
            </Form.Group>
          </div>
          <div>
            <h3>Working Hours</h3>
          </div>
          <div>
            <Form.Group controlId="facility-open-time">
              <Form.ControlLabel>Open Time *</Form.ControlLabel>
              <TimePicker
                id="facility-open-time"
                value={openTime ? new Date(`1970-01-01T${openTime}:00`) : null}
                onChange={(value) =>
                  setOpenTime(value ? value.toTimeString().slice(0, 5) : "")
                }
                format="HH:mm"
              />
            </Form.Group>
            <Form.Group controlId="facility-close-time">
              <Form.ControlLabel>Close Time *</Form.ControlLabel>
              <TimePicker
                id="facility-close-time"
                value={
                  closeTime ? new Date(`1970-01-01T${closeTime}:00`) : null
                }
                onChange={(value) =>
                  setCloseTime(value ? value.toTimeString().slice(0, 5) : "")
                }
                format="HH:mm"
              />
            </Form.Group>
          </div>
          <div
            className="action-buttons-row"
          >
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => window.history.back()}
              className="action-button"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              className="action-button"
              onClick={handleSubmit}
              disabled={
                !name ||
                !address ||
                !description ||
                !coverImageUrl ||
                !openTime ||
                !closeTime
              } // There must be a solid way to check form validation like in Angular, but I have not found it yet. React-hook-form looked promising but it does not work well with rsuite Forms.
            >
              {editMode ? "Update" : "Create"} Facility
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FacilityForm;
