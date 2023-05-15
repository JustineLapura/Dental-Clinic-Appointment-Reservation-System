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
    // Get services from localStorage or use default values
    const storedServices = localStorage.getItem("services");
    return storedServices ? JSON.parse(storedServices) : [
      {
        id: nanoid(),
        name: "Teeth Cleaning",
        description: "Cleaning of teeth to remove tartar and plaque buildup",
        price: 100
      },
      {
        id: nanoid(),
        name: "Fillings",
        description: "Restoration of decayed or damaged teeth with fillings",
        price: 200
      },
      {
        id: nanoid(),
        name: "Teeth Whitening",
        description: "Whitening of teeth to remove stains and discoloration",
        price: 150
      }
    ];
  });
  
  // Save services to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

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
