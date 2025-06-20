import * as React from "react";

import { Button, Card, Fab, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "rsuite";

import { Facility } from "../../common/models/Facility";
import { deleteFacility, setFavorite } from "../../facilitiesSlice";
import type { RootState } from "../../store";
import "./facilities.scss";

const Facilities: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const locations = useSelector((state: RootState) => state.facilities.value);

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const [facilityToDelete, setFacilityToDelete] =
    React.useState<Facility | null>(null);

  const handleDelete = async (facility: Facility) => {
    setFacilityToDelete(facility);
    setDeleteModalOpen(true);
  };

  const isOpen = (openTime: string, closeTime: string): boolean => {
    const now = new Date();
    const open = new Date(now.toDateString() + " " + openTime);
    const close = new Date(now.toDateString() + " " + closeTime);
    return now >= open && now <= close;
  };

  const goToFacilityForm = (facilityId?: string) => {
    navigate(`/facility-form/${facilityId || ""}`);
  };

  return (
    <Box className="facilities">
      <Box className="create-button-row">
        <Button variant="contained" onClick={() => goToFacilityForm()}>
          Create Facility
        </Button>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, gridTemplateColumns: "repeact(3, 1fr)" }}
      >
        {locations.map((location, idx) => (
          <Card className="location-card" key={idx}>
            <div style={{ position: "relative" }}>
              <Fab
                onClick={() => dispatch(setFavorite(location.id))}
                color="primary"
                size="small"
                sx={{
                  position: "absolute",
                  top: "0.5rem",
                  left: "0.5rem",
                  zIndex: 2,
                }}
                className={
                  location.isFavorite ? "favorite-star" : "default-star"
                }
                aria-label="favorite"
              >
                <FaRegStar />
              </Fab>
              <img
                src={location.coverImageUrl}
                alt={location.name}
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />
            </div>
            <Box
              className="location-details"
              sx={{
                mt: 2,
              }}
            >
              <Box className="location-details-header">
                <div>
                  <h3>{location.name} </h3>
                </div>
                <div>
                  <span
                    className={
                      isOpen(location.openTime, location.closeTime)
                        ? "facility-open"
                        : "facility-closed"
                    }
                  >
                    {isOpen(location.openTime, location.closeTime)
                      ? "Open"
                      : "Closed"}
                  </span>
                </div>
              </Box>
              <Box
                className="location-details-footer"
              >
                <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="facilities-button-edit"
                    onClick={() => goToFacilityForm(location.id)}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="facilities-button-delete"
                    onClick={() => handleDelete(location)}
                  >
                    <AiOutlineDelete />
                  </Button>
                </div>
                <div
                  className="location-address"
                >
                  <LuMapPin className="facilities-address-pin" />
                  <span className="facilities-address">{location.address}</span>
                </div>
              </Box>
            </Box>
          </Card>
        ))}
        <Modal
          open={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setFacilityToDelete(null);
          }}
          backdrop="static"
        >
          <Modal.Header className="delete-modal-header"
          >
            <Modal.Title>Delete Facility</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Are you sure you want to delete this facility? This action cannot
              be undone.
            </div>
            <div>
              Facility: <strong>{facilityToDelete?.name}</strong>
            </div>
          </Modal.Body>
          <Modal.Footer className="delete-modal-footer"
          >
            <Box className="delete-modal-buttons-row"
            >
              <div className="button-container">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setFacilityToDelete(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
              <div className="button-container">
                <Button
                  variant="contained"
                  onClick={() => {
                    if (facilityToDelete) {
                      dispatch(deleteFacility(facilityToDelete.id));
                    }
                    setFacilityToDelete(null);
                    setDeleteModalOpen(false);
                  }}
                >
                  Yes, Delete
                </Button>
              </div>
            </Box>
          </Modal.Footer>
        </Modal>
      </Grid>
    </Box>
  );
};

export default Facilities;
