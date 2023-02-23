import Image from 'next/image'
import { Text } from '@kalidao/reality'
import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
  } from 'react'
  import * as styles from './styles.css'
  
  export const EmojiList = forwardRef((props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
  
    const selectItem = index => {
      const item = props.items[index]
  
      if (item) {
        props.command({ name: item.name })
      }
    }
  
    const upHandler = () => {
      setSelectedIndex(((selectedIndex + props.items.length) - 1) % props.items.length)
    }
  
    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length)
    }
  
    const enterHandler = () => {
      selectItem(selectedIndex)
    }
  
    useEffect(() => setSelectedIndex(0), [props.items])
  
    useImperativeHandle(ref, () => {
      return {
        onKeyDown: x => {
          if (x.event.key === 'ArrowRight') {
            upHandler()
            return true
          }
          if (x.event.key === 'ArrowUp') {
            upHandler()
            return true
          }
          
          if (x.event.key === 'ArrowLeft') {
            downHandler()
            return true
          }
          if (x.event.key === 'ArrowDown') {
            downHandler()
            return true
          }
  
          if (x.event.key === 'Enter') {
            enterHandler()
            return true
          }
  
          return false
        },
      }
    }, [upHandler, downHandler, enterHandler])
  
    return (
      <div aria-label="Emoji Menu" className={styles.emojiMenuRoot}>
        {props.items.map((item, index) => (
          <button
            className={index === selectedIndex ? styles.activeEmojiMenuButton : styles.emojiMenuButton}
            key={index}
            onClick={() => selectItem(index)}
          >
            { item?.emoji}
          </button>
        ))}
      </div>
    )
  })