import styled from 'styled-components';

export let MessageBlock = styled.div`
  display: flex;
  justify-content: end;
  padding-bottom: 40px;
  
  @media screen and (max-width: 360px) {
    padding-bottom: 20px;
  }
`
export let ImageAndText = styled.div`
  display: flex;
  flex-direction: row-reverse;

`
export let ImageAndTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 12px;
  justify-content: flex-end;
`

export let Image = styled.img`
  width: 48px;
  height: 48px;
`
export let MessageText = styled.div`
  position: relative;
  background-color: #0066CC;
  border-radius: 12px 12px 0px 12px;
  padding: 7px 13px;
  max-width: 500px;

  *::before {
    content: "";
    position: absolute;
    right: -10px;
    bottom: 0px;
    border-width: 10px;
    border-style: solid;
    transform: rotate(90deg);
    border-color: transparent #0066CC transparent transparent;
  }
`

export let MessageName = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #FFFFFF;
  display: flex;
  justify-content: flex-end;
`
export let MessageTextBlock = styled.pre`
  font-weight: 400;
  font-size: 16px;
  color: #FFFFFF;
  white-space: normal;
  font-family: 'Montserrat';
`
export let Time = styled.div`
  font-weight: 600;
  font-size: 10px;
  color: #000000;
`