import React from 'react'
import styles from './style.less'
import { h, render, Component } from 'preact';

// Set the length to match current children from props

export default class Carousel extends Component{

	constructor(props){
		super(props);
		const {children} = props;
		this.children = children;
		this.currentIndex = 0;
		this.touchPosition = null;
		this.mousePosition = null;


		this.state = {
			currentIndex: 0,
			length: this.children.length,
			touchPosition: null,
			mousePosition: null
		}

		this.Prev = this.Prev.bind(this);
		this.Next = this.Next.bind(this);
		this.render = this.render.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleMouseOn = this.handleMouseOn.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);

		/*
		this.next = (e) => {
			e.preventDefault();
			if (this.state.currentIndex < (this.state.length - 1)) {
				this.state.currentIndex += 1;
			}
		}

		this.prev = (e) => {
			e.preventDefault();
			if (this.state.currentIndex > 0) {
				this.state.currentIndex -= 1;
			}
		}

		 */

		/*
		this.handleMouseOn = (e) => {
			this.state.mousePosition = e.pageX[0].clientX;
		}

		this.handleMouseMove = (e) => {
			const mouseDown = this.mousePosition;

			if(mouseDown === null) {
				return;
			}

			const currentMouse = e.touches[0].clientX;
			const diff = mouseDown - currentMouse;

			if (diff > 5) {
				this.next();
			}

			if (diff < -5) {
				this.prev();
			}

			this.mousePosition = null;
		}

		 */
	}

	Prev(){
		if (this.state.currentIndex > 0) {
			this.state.currentIndex -= 1;
		}
		this.forceUpdate();
	}

	Next(){
		if (this.state.currentIndex < (this.state.length - 1)) {
			this.state.currentIndex += 1
		}
		this.forceUpdate();
	}

	handleTouchStart = (e) => {
		this.state.touchPosition = e.touches[0].clientX;
	}

	handleTouchMove = (e) => {
		const touchDown = this.state.touchPosition;

		if(touchDown === null) {
			return;
		}

		const currentTouch = e.touches[0].clientX;
		const diff = touchDown - currentTouch;

		if (diff > 5) {
			this.Next();
		}

		if (diff < -5) {
			this.Prev();
		}

		this.state.touchPosition = null;
	}


	handleMouseOn = (e) => {
		e.persist();
		//alert( e.toString() + "Mouse down");
		this.state.mousePosition = e.clientX;
		//console.log(this.state.mousePosition);
	}

	handleMouseMove = (e) => {
		e.persist();
		//alert("Mouse Up");
		const mouseDown = this.state.mousePosition;
		//alert(e.toString() + "Mouse up");
		if(mouseDown === null) {
			return;
		}

		const currentMouse = e.clientX;
		const diff = mouseDown - currentMouse;

		if (diff > 5) {
			this.Next();
		}

		if (diff < -5) {
			this.Prev();
		}

		this.state.mousePosition = null;
	}



	showAlert = () => {
		alert("I'm an alert test");
	}

	componentDidMount(){
		this.state.length = this.children.length
	}

	componentDidUpdate(){
	}
// style={{ transform: `translateX(-${this.state.currentIndex * 100}%)` }}
	render() {
		/*        	<carousel_content_wrapper
                      		className={styles.carousel_content_wrapper}
                      		//onTouchStart={handleTouchStart}
                              //onTouchMove={handleTouchMove}
                      	>

                     <button
							className="left-arrow"
							onClick={this.Prev}
						>
							&lt;
						</button>


						<button
							className="right-arrow"
							onClick={this.Next}>
							&gt;
						</button>
                      	*/
		console.log(this.state.currentIndex);
		return (<carousel_container className={styles.carousel_container}>
                	<carousel_wrapper
						className={styles.carousel_wrapper}
						onTouchStart={this.handleTouchStart}
						onTouchMove={this.handleTouchMove}
						onMouseDown = {this.handleMouseOn}
						onMouseUp = {this.handleMouseMove}
					>

						<carousel_content
							className={styles.carousel_content}
							style={{ transform: `translateX(-${this.state.currentIndex * 100}%)` }}
						>
							{this.children}
						</carousel_content>

                    </carousel_wrapper>
				</carousel_container>);
	}
}

	//const {children} = props;

	/*
	const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
    const [touchPosition, setTouchPosition] = useState(null)

	useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - 1)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

	const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }
	*/


    /*return (
        <div className="carousel-container">
        	<div className="carousel-wrapper">
            	<div
            		className="carousel-content-wrapper"
            		//onTouchStart={handleTouchStart}
                    //onTouchMove={handleTouchMove}
            	>
                	<div
                    	className="carousel-content"
                        //style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                    	{children}
                    </div>
                </div>
            </div>
        </div>
    )*/
//}

