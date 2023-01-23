import Accordion from "react-bootstrap/Accordion";
import AddLoaner from "./AddLoaner";
function AccordionCollapse() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>ADD A NEW LOANER</Accordion.Header>
        <Accordion.Body>
          <AddLoaner />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionCollapse;
