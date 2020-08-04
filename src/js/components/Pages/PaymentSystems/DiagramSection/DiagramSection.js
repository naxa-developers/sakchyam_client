import React, { useState } from 'react';
import LeftPortion from './LeftPortion';
import RightPortion from './RightPortion';

const DiagramSection = () => {
  const [isRedActive, setIsRedActive] = useState(false);
  const [isBlueActive, setIsBlueActive] = useState(false);
  const [isGreenActive, setIsGreenActive] = useState(false);

  const onRedClick = () => {
    setIsRedActive(!isRedActive);
    setIsBlueActive(false);
    setIsGreenActive(false);
  };

  const onBlueClick = () => {
    setIsBlueActive(!isBlueActive);
    setIsRedActive(false);
    setIsGreenActive(false);
  };

  const onGreenClick = () => {
    setIsGreenActive(!isGreenActive);
    setIsRedActive(false);
    setIsBlueActive(false);
  };

  return (
    <main className="payment-system">
      <LeftPortion
        isRedActive={isRedActive}
        isBlueActive={isBlueActive}
        isGreenActive={isGreenActive}
        onRedClick={onRedClick}
        onBlueClick={onBlueClick}
        onGreenClick={onGreenClick}
      />

      <RightPortion
        isRedActive={isRedActive}
        isBlueActive={isBlueActive}
        isGreenActive={isGreenActive}
        onRedClick={onRedClick}
        onBlueClick={onBlueClick}
        onGreenClick={onGreenClick}
      />
    </main>
  );
};

export default DiagramSection;
