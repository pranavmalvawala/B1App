import React from "react";
import { CheckinHelper } from "../../components";
import { GroupInterface } from "../../appBase/interfaces";
import { Row, Col, Button } from "react-bootstrap";

interface GroupCategoryInterface { key: number, name: string, items: GroupInterface[] }

interface Props { selectedHandler: (group: GroupInterface) => void }

export const Groups: React.FC<Props> = (props) => {
  const [selectedCategory, setSelectedCategory] = React.useState<GroupCategoryInterface>(null);
  const [groupTree, setGroupTree] = React.useState<GroupCategoryInterface[]>([]);

  const buildTree = () => {
    let category = "";
    let gt: GroupCategoryInterface[] = [];

    const sortedGroups = CheckinHelper.selectedServiceTime?.groups?.sort((a, b) => ((a.categoryName || "") > (b.categoryName || "")) ? 1 : -1);

        sortedGroups?.forEach(g => {
          if (g.categoryName !== category) gt.push({ key: gt.length, name: g.categoryName || "", items: [] })
          gt[gt.length - 1].items.push(g);
          category = g.categoryName || "";
        })
        setGroupTree(gt);
  }

  const selectCategory = (category: GroupCategoryInterface) => {
    if (selectedCategory === category) setSelectedCategory(null);
    else setSelectedCategory(category);
  }

  const getCategories = () => {
    let result: JSX.Element[] = [];
    groupTree.forEach(c => {
      result.push(getCategory(c));
    });
    return (result);
  }

  const getCategory = (category: GroupCategoryInterface) => {
    const arrow = (category === selectedCategory) ? (<i className="fas fa-angle-down"></i>) : (<i className="fas fa-angle-right"></i>);
    const groupList = (category === selectedCategory) ? getGroups() : null;
    return (<>
      <a href="about:blank" className="bigLinkButton checkinPerson" onClick={(e) => { e.preventDefault(); selectCategory(category) }}>
        <Row>
          <Col xs={1}>{arrow}</Col>
          <Col xs={11}>
            {category.name}
          </Col>
        </Row>
      </a>
      {groupList}
    </>);
  }

  const getGroups = () => {
    let result: JSX.Element[] = [];
        selectedCategory?.items?.forEach(g => {
          result.push(getGroup(g));
        })
        return result;
  }

  const getGroup = (g: GroupInterface) => (<div className="checkinGroup">
    <a href="about:blank" onClick={(e) => { e.preventDefault(); props.selectedHandler(g) }}>{g.name}</a>
  </div>)

  React.useEffect(() => {
    buildTree()
  }, []);

  return (
    <>
      {getCategories()}<br />
      <Button variant="danger" block onClick={(e) => { e.preventDefault(); props.selectedHandler({ id: "", name: "NONE" }) }}>NONE</Button>
    </>
  )
}
