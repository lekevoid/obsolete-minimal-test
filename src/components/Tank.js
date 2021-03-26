import React, {Component} from "react"
import "@css/components/Tank.css";
import classnames from "classnames";

class Tank extends Component {
    render() {
		const { div, id, className, children } = this.props;
		if (div) {
			return (
				<div id={ id } className={ classnames("Tank", className) }>
					{ children }
				</div>
			)
		} else {
			return (
				<section id={ id } className={ classnames("Tank", className) }>
					{ children }
				</section>
			)
		}
    }
}

export default Tank