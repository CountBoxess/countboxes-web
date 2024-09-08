import React, { useState } from 'react';
import Scanner from '../../../components/scanner/Scanner';
// import Modal from './Modal'; // Implementar um modal com botão de confirmar ou cancelar

const ItemScannerPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);

  const handleDetected = (result) => {
    console.log(result);
    setScannedCode(result);
    setShowModal(true);
  };

  const handleConfirm = () => {
    // Requisição para incrementar carregamento
    setShowModal(false);
    // Lógica para continuar o carregamento
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Escaneando Item</h1>
      <Scanner onDetected={handleDetected} />
      {/* {showModal && (
        // <Modal scannedCode={scannedCode} onConfirm={handleConfirm} onCancel={handleCancel} />
      )} */}
    </div>
  );
};

export default ItemScannerPage;
