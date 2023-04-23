import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Button, Card } from "@material-ui/core";
import Modal from "../../components/Modal";

const ViewMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/get-all-materials/"
      );
      setMaterials(response.data);
    };

    fetchMaterials();
  }, []);

  const handleViewMaterial = (material) => {
    setSelectedMaterial(material);
    setModal(true);
  };
  return (
    <>
      <Paper className="col-12 p-4">
        <h3 className="text-center mb-5">Placement Material</h3>
        <section className="d-flex flex-wrap">
          {materials?.map((m, index) => (
            <>
              <Card className="col-12 col-md-4 p-3">
                <h5>{m?.title}</h5>
                <p>{m?.description}</p>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleViewMaterial(m)}
                >
                  View File
                </Button>
                {selectedMaterial && modal && (
                  <Modal
                    setModal={setModal}
                    resume={`http://localhost:8080/uploads/materials/${selectedMaterial?.material}`}
                  />
                )}
              </Card>
            </>
          ))}
        </section>
      </Paper>
    </>
  );
};

export default ViewMaterials;
