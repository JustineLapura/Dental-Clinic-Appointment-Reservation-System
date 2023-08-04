import { createContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";

const ServicesContext = createContext();

export const ServiceProvider = ({ children }) => {
  // Define state for adding a new service
  const [showAddModal, setShowAddModal] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Define state for editing a service
  const [showEditModal, setShowEditModal] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);
  const [editServiceName, setEditServiceName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // Define state for existing services
  const [services, setServices] = useState(() => {
    let storedServices = null;

    if (typeof window !== 'undefined') {
      storedServices = localStorage.getItem('services');
    }

    return storedServices
      ? JSON.parse(storedServices)
      : [
        // Default services data...
        {
          id: "first",
          name: "Tooth Extraction",
          description: "The removal of teeth from the dental alveolus (socket) in the alveolar bone.",
          price: 99
        },
        {
          id: "second",
          name: "Tooth Cleaning",
          description: "Involves the removal of dental plaque from teeth with the intention of preventing cavities (dental caries), gingivitis, and periodontal disease.",
          price: 150
        },
        {
          id: "third",
          name: "Dental Filling",
          description: "A restorative material used to artificially restore the function, integrity, and morphology of missing tooth structure.",
          price: 120
        },
        {
          id: "fourth",
          name: "Teeth Whitening",
          description: "A cosmetic dental procedure to lighten the shade of teeth and remove stains and discoloration.",
          price: 200
        },
        {
          id: "fifth",
          name: "Dental Crown",
          description: "A dental restoration that completely caps or encircles a tooth, protecting it and restoring its shape, size, strength, and appearance.",
          price: 350
        },
        {
          id: "sixth",
          name: "Root Canal Treatment",
          description: "A procedure to save an infected or damaged tooth by removing the pulp and cleaning and sealing the inside of the tooth.",
          price: 400
        },
        {
          id: "seventh",
          name: "Dental Implant",
          description: "An artificial tooth root placed into your jaw to hold a replacement tooth or bridge.",
          price: 900
        },
        {
          id: "eighth",
          name: "Orthodontic Treatment",
          description: "The use of braces, aligners, or other devices to correct the alignment of teeth and bite.",
          price: 2500
        },
        {
          id: "ninth",
          name: "Dental Bridge",
          description: "A fixed dental restoration used to replace one or more missing teeth by joining artificial teeth to adjacent natural teeth.",
          price: 600
        },
      ];
      
  });
  
  // Save services to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('services', JSON.stringify(services));
    }
  }, [services]);
  
  // Save services to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("services", JSON.stringify(services));
  // }, [services]);

  // Define function to add a new service
  const handleAddService = () => {
    // Perform validation and add service to database
    // Then, close modal and clear form
    const newService = {
      id: nanoid(),
      name: serviceName,
      description: description,
      price: parseInt(price)
    };
    setServices([...services, newService]);
    setShowAddModal(false);
    setServiceName("");
    setDescription("");
    setPrice("");
  };

  // Define function to open modal for editing a service
  const handleEditServiceModalOpen = (id) => {
    const service = services.find((s) => s.id === id);
    setEditServiceId(id);
    setEditServiceName(service.name);
    setEditDescription(service.description);
    setEditPrice(service.price);
    setShowEditModal(true);
  };

  // Define function to edit an existing service
  const handleEditService = () => {
    // Perform validation and update service in database
    // Then, close modal and clear form
    const editedService = {
      id: editServiceId,
      name: editServiceName,
      description: editDescription,
      price: parseInt(editPrice)
    };
    const updatedServices = services.map((s) =>
      s.id === editServiceId ? editedService : s
    );
    setServices(updatedServices);
    setShowEditModal(false);
    setEditServiceId(null);
    setEditServiceName("");
    setEditDescription("");
    setEditPrice("");
  };

  // Define function to delete an existing service
  const handleDeleteService = (id) => {
    // Remove service from database
    const updatedServices = services.filter((s) => s.id !== id);
    setServices(updatedServices);
  };

  // Wrap our children components with the Provider, passing the state and functions
  return (
    <ServicesContext.Provider
      value={{
        services,
        showAddModal,
        showEditModal,
        serviceName,
        description,
        price,
        editServiceId,
        editServiceName,
        editDescription,
        editPrice,
        setShowAddModal,
        setShowEditModal,
        setServiceName,
        setDescription,
        setPrice,
        setEditServiceId,
        setEditServiceName,
        setEditDescription,
        setEditPrice,
        handleAddService,
        handleEditServiceModalOpen,
        handleEditService,
        handleDeleteService
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesContext;
