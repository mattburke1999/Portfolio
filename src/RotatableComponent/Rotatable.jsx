import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

function getTransformMatrix(element) {
    const matrix = window.getComputedStyle(element).transform;
    let matrixArray = [0, 0, 0, 0, 0, 0];

    if (matrix && matrix !== 'none') {
        matrixArray = matrix
            .replace('matrix(', '')
            .replace(')', '')
            .replace(',', '')
            .split(' ')
            .map(value => parseFloat(value));
    }

    return matrixArray;
}

class Rotatable extends Component {
    constructor(props) {
        super(props);

        this.rotatableRef = createRef();

        this.handleStartRotate = this.handleStartRotate.bind(this);
        this.handleRotate = this.handleRotate.bind(this);
        this.handleStopRotate = this.handleStopRotate.bind(this);

        this.state = { rotating: false, angle: 0, initialAngle: 0 };
    }

    componentDidMount() {
        this.addHandle();
    }

    componentDidUpdate() {
        if (!this.state.rotating) {
            this.addHandle();
        }
    }

    componentWillUnmount() {
        if (this.handle) {
            this.handle.removeEventListener('mousedown', this.handleStartRotate);
        }
        document.removeEventListener('mouseup', this.handleStopRotate);
    }

    addHandle() {
        const rotatable = this.rotatableRef.current;

        rotatable.querySelectorAll('.rotate-handle-holder').forEach(e => e.remove());
        if (!this.props.canRotate) {
            return;
        }
        this.handleContainer = document.createElement('div');
        this.handleContainer.classList.add('rotate-handle-holder');
        this.handle = document.createElement('div');
        this.handle.classList.add('rotate-handle');
        this.handleContainer.appendChild(this.handle);
        if (rotatable.firstChild) {
            rotatable.insertBefore(this.handleContainer, rotatable.firstChild);
        } else {
            rotatable.appendChild(this.handleContainer);
        }

        this.handle.textContent = 'Drag me back please';
        this.handle.style.textAlign = 'center';
        this.handle.style.font = '9px comic sans ms';
        this.handle.style.cursor = 'pointer';
        this.handle.style.paddingTop = '3px';
        this.handle.style.width = '55px';
        this.handle.style.height = '30px';
        this.handle.style.background = 'white';
        this.handle.style.color = 'black';
        this.handle.style.borderRadius = '12.5%';
        this.handle.style.textShadow = 'none';
        this.handle.style.position = 'relative';
        this.handle.style.right = '60px';
        this.handle.style.top = '35px';
        this.handle.style.border = '1px solid black';

        this.handle.addEventListener('mousedown', this.handleStartRotate);
        document.addEventListener('mouseup', this.handleStopRotate);
    }

    handleStartRotate(e) {
        const rotatable = this.rotatableRef.current;

        let isRightButton = false;
        if ('which' in e) {
            isRightButton = e.which === 3;
        } else if ('button' in e) {
            isRightButton = e.button === 2;
        }

        if (isRightButton) {
            return;
        }

        const { onRotateStart } = this.props;

        e.stopPropagation();
        document.addEventListener('mousemove', this.handleRotate);

        const bounds = rotatable.getBoundingClientRect();
        const topRightX = bounds.right;
        const topRightY = bounds.top;

        const startX = e.clientX - topRightX;
        const startY = e.clientY - topRightY;
        const initialAngle = Math.atan2(startY, startX) * (180 / Math.PI);

        const currentTransform = getTransformMatrix(rotatable);
        const currentAngle = Math.atan2(currentTransform[1], currentTransform[0]) * (180 / Math.PI);

        this.setState({ rotating: true, initialAngle, currentAngle });

        if (onRotateStart) {
            onRotateStart(e, rotatable, this.state.angle);
        }
    }

    handleRotate(e) {
        const rotatable = this.rotatableRef.current;

        e.stopPropagation();
        e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        if (!this.state.rotating) {
            return;
        }

        const { onRotate } = this.props;

        const bounds = rotatable.getBoundingClientRect();
        const topRightX = bounds.right;
        const topRightY = bounds.top;

        const mouseX = e.clientX - topRightX;
        const mouseY = e.clientY - topRightY;
        const angleRad = Math.atan2(mouseY, mouseX);
        const angleDeg = angleRad * (180 / Math.PI);

        let deltaAngle = angleDeg - this.state.initialAngle + this.state.currentAngle;

        deltaAngle = deltaAngle < 0 ? deltaAngle + 360 : deltaAngle % 360;

        const matrixArray = getTransformMatrix(rotatable);
        rotatable.style.transformOrigin = 'top right';
        rotatable.style.transform = `translate(${matrixArray[4]}px, ${matrixArray[5]}px) rotate(${deltaAngle}deg)`;

        this.setState({ angle: deltaAngle }, () => {
            if (onRotate) {
                onRotate(e, rotatable, deltaAngle);
            }
        });

        if (deltaAngle > 0 && deltaAngle < 0.5 || deltaAngle > 359.5) {
            const target = document.getElementById('target');
            let targetRect = target.getBoundingClientRect();
            let handleRect = this.handle.getBoundingClientRect();

            const isOverlapping = !(
                handleRect.right < targetRect.left ||
                handleRect.left > targetRect.right ||
                handleRect.bottom < targetRect.top ||
                handleRect.top > targetRect.bottom
            );
            if (isOverlapping) {
                this.props.overlapFunction();
                return;
            }
        }
    }

    handleStopRotate(e) {
        if (!this.state.rotating) {
            return;
        }

        const { onRotateStop } = this.props;

        document.removeEventListener('mousemove', this.handleRotate);

        this.setState({ rotating: false }, () => {
            if (onRotateStop) {
                onRotateStop(e, this.rotatableRef.current, `${this.state.angle}deg`);
            }
        });
    }

    render() {
        const children = React.Children.toArray(this.props.children);

        return React.cloneElement(children[0], {
            ref: this.rotatableRef,
        });
    }
}

Rotatable.propTypes = {
    children: PropTypes.element.isRequired,
    onRotateStart: PropTypes.func,
    onRotate: PropTypes.func,
    onRotateStop: PropTypes.func,
    canRotate: PropTypes.bool,
    overlapFunction: PropTypes.func
};

Rotatable.defaultProps = {
    canRotate: true,
    overlapFunction: () => {}
};

export default Rotatable;
