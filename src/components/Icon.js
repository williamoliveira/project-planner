import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'

config.autoAddCss = false
config.autoReplaceSvg = false
config.searchPseudoElements = false
config.observeMutations = false
library.add(fas, faCheckCircle)

export default ({ name, ...props }) => <FontAwesomeIcon {...props} icon={name} />
