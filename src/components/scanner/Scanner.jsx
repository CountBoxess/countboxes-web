/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { config } from './config';
import Quagga from 'quagga';
import './style.css';

const Scanner = (props) => {
  const { onDetected } = props;

  useEffect(() => {
    Quagga.init(config, (err) => {
      if (err) {
        console.log(err, 'error msg');
      } else {
        Quagga.start();
      }
    });

    //detecting boxes on stream
    Quagga.onProcessed((result) => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute('width')),
            Number(drawingCanvas.getAttribute('height'))
          );
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: '#00F',
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, {
            color: 'red',
            lineWidth: 3
          });
        }
      }
    });

    Quagga.onDetected(detected);

    // Cleanup: stop Quagga and remove event listeners
    return () => {
      Quagga.offProcessed();
      Quagga.offDetected(detected);
      Quagga.stop();
    };
  }, []);

  const detected = (result) => {
    onDetected(result);
  };

  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
